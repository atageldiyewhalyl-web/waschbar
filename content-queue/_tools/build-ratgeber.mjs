#!/usr/bin/env node
// Builds Ratgeber entries from content-queue/<date>-<slug>/package.md files.
//
//   node --experimental-strip-types content-queue/_tools/build-ratgeber.mjs [--dry] [--date 2026-10-24]
//
// What it does (idempotent, skips slugs that already exist):
//   1. validates every package against the SEO rules in the daily-client-blogs standards
//   2. inserts the posts into src/app/data/blog-posts.ts (newest block first, ordered by `rank`)
//   3. merges related-post links into src/app/data/related-posts.ts
//   4. adds the URLs to public/sitemap.xml and the Ratgeber list in public/llms.txt
//   5. writes the generated JSON-LD back into each package.md ("## Schema")

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const args = process.argv.slice(2);
const DRY = args.includes("--dry");
const dateArg = args.includes("--date") ? args[args.indexOf("--date") + 1] : null;
const SITE = "https://www.waschbar.eu";

const POSTS_FILE = path.join(ROOT, "src/app/data/blog-posts.ts");
const RELATED_FILE = path.join(ROOT, "src/app/data/related-posts.ts");
const SITEMAP_FILE = path.join(ROOT, "public/sitemap.xml");
const LLMS_FILE = path.join(ROOT, "public/llms.txt");
const QUEUE = path.join(ROOT, "content-queue");
const EXTRAS_FILE = path.join(QUEUE, "_related-extras.json");

const STATIC_PAGES = new Set(["/", "/heidelberg", "/ludwigshafen", "/rabattkarte", "/ratgeber"]);

function parsePackage(file) {
  const raw = fs.readFileSync(file, "utf8");
  const m = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(raw);
  if (!m) throw new Error(`${file}: missing frontmatter`);
  const meta = {};
  for (const line of m[1].split("\n")) {
    const kv = /^([a-z_]+):\s*(.*)$/.exec(line);
    if (!kv) continue;
    let v = kv[2].trim();
    if (v.startsWith("[") && v.startsWith('["')) v = JSON.parse(v);
    else if (v === "true") v = true;
    else if (v === "false") v = false;
    meta[kv[1]] = v;
  }
  let body = m[2].replace(/\n## Schema[\s\S]*$/, "").trim();
  const h1 = /^# (.+)\n/.exec(body + "\n");
  if (!h1) throw new Error(`${file}: body must start with "# H1"`);
  const title = h1[1].trim();
  body = body.slice(h1[0].length).trim();
  return { meta, title, body };
}

function parseFaq(body) {
  const idx = body.search(/^## .*(häufige fragen|faq)/im);
  if (idx === -1) return [];
  const section = body.slice(idx).split("\n").slice(1);
  const out = [];
  let q = null;
  let a = [];
  const flush = () => {
    if (q && a.length) out.push({ q, a: a.join(" ").trim() });
    q = null;
    a = [];
  };
  for (const line of section) {
    const t = line.trim();
    if (/^## /.test(t)) break; // next H2 ends the FAQ block
    const bold = /^\*\*(.+?)\*\*$/.exec(t);
    if (bold) {
      flush();
      q = bold[1];
    } else if (t && q) a.push(t);
  }
  flush();
  return out;
}

function plain(s) {
  return s.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\[(.+?)\]\((.+?)\)/g, "$1");
}

function parseHowTo(body) {
  const lines = body.split("\n");
  const steps = [];
  let inList = false;
  for (const line of lines) {
    const t = line.trim();
    if (/^\d+\.\s+/.test(t)) {
      inList = true;
      const item = t.replace(/^\d+\.\s+/, "");
      const m = /^\*\*(.+?)\*\*[.:]?\s*(.*)$/.exec(item);
      steps.push(m ? { name: m[1].replace(/[.:]$/, ""), text: plain(m[2] || m[1]) } : { name: plain(item).slice(0, 60), text: plain(item) });
    } else if (inList && t === "") {
      if (steps.length >= 3) break;
    } else if (inList && !/^\d+\./.test(t)) {
      if (steps.length >= 3) break;
      steps.length = 0;
      inList = false;
    }
  }
  return steps;
}

function buildSchema(meta, title, faqs, steps) {
  const url = `${SITE}/ratgeber/${meta.slug}`;
  const graph = [
    {
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: title,
      description: meta.meta_description,
      image: [`${SITE}${meta.hero_image}`],
      datePublished: meta.date,
      dateModified: meta.date,
      author: { "@id": `${SITE}/#organization` },
      publisher: { "@id": `${SITE}/#organization` },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      inLanguage: "de-DE",
    },
  ];
  if (meta.howto && steps.length >= 3) {
    graph.push({
      "@type": "HowTo",
      "@id": `${url}#howto`,
      name: meta.howto_name,
      totalTime: meta.howto_total_time,
      step: steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.name, text: s.text })),
    });
  }
  graph.push({
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: plain(f.a) },
    })),
  });
  return { "@context": "https://schema.org", "@graph": graph };
}

async function loadTs(file) {
  const tmp = path.join(QUEUE, "_tools", `.tmp-${path.basename(file)}.mts`);
  fs.copyFileSync(file, tmp);
  try {
    return await import(pathToFileURL(tmp).href + `?t=${Date.now()}`);
  } finally {
    fs.unlinkSync(tmp);
  }
}

const existing = await loadTs(POSTS_FILE);
const existingSlugs = new Set(existing.blogPosts.map((p) => p.slug));

const dirs = fs
  .readdirSync(QUEUE)
  .filter((d) => /^\d{4}-\d{2}-\d{2}-/.test(d) && fs.existsSync(path.join(QUEUE, d, "package.md")))
  .filter((d) => !dateArg || d.startsWith(dateArg));

const pkgs = dirs.map((d) => ({ dir: d, file: path.join(QUEUE, d, "package.md"), ...parsePackage(path.join(QUEUE, d, "package.md")) }));
const allSlugs = new Set([...existingSlugs, ...pkgs.map((p) => p.meta.slug)]);

let errors = 0;
let warnings = 0;
const err = (slug, msg) => { errors++; console.error(`ERROR  ${slug}: ${msg}`); };
const warn = (slug, msg) => { warnings++; console.warn(`warn   ${slug}: ${msg}`); };

const required = ["slug","date","status","rank","primary_keyword","secondary_keywords","intent","title_tag","meta_description","author","category","hero_image","hero_alt","body_image","body_alt","related"];

for (const p of pkgs) {
  const { meta, title, body } = p;
  const s = meta.slug || p.dir;
  for (const k of required) if (meta[k] === undefined) err(s, `missing frontmatter "${k}"`);
  if (p.dir.slice(11) !== meta.slug) err(s, `dir name does not match slug (${p.dir})`);
  if (meta.status !== "ready") warn(s, `status=${meta.status}, skipped`);
  if (meta.title_tag && meta.title_tag.length > 60) err(s, `title_tag ${meta.title_tag.length} chars (>60)`);
  if (meta.meta_description && (meta.meta_description.length < 140 || meta.meta_description.length > 156)) err(s, `meta_description ${meta.meta_description.length} chars (want 140-156)`);
  for (const img of [meta.hero_image, meta.body_image]) {
    if (img && !fs.existsSync(path.join(ROOT, "public", img))) err(s, `image missing: ${img}`);
  }
  const words = body.split(/\s+/).length;
  if (words < 1000) warn(s, `only ${words} words`);
  if (words > 2600) warn(s, `${words} words (long)`);
  const first150 = body.split(/\s+/).slice(0, 150).join(" ").toLowerCase();
  const kw = (meta.primary_keyword || "").toLowerCase();
  if (kw && !kw.split(/\s+/).every((w) => first150.includes(w.replace(/[^\p{L}\p{N}]/gu, "")))) warn(s, `primary keyword words not all in first 150 words`);
  const faqs = parseFaq(body);
  if (faqs.length < 4 || faqs.length > 7) err(s, `${faqs.length} FAQ entries (want 4-7)`);
  for (const f of faqs) {
    const n = plain(f.a).split(/\s+/).length;
    if (n < 28 || n > 75) warn(s, `FAQ answer ${n} words: "${f.q.slice(0, 50)}"`);
  }
  const h2 = (body.match(/^## /gm) || []).length;
  if (h2 < 5) warn(s, `only ${h2} H2`);
  // internal links
  const links = [...body.matchAll(/\]\((\/[^)\s]*)\)/g)].map((x) => x[1]);
  const uniq = new Set(links);
  if (uniq.size < 4) warn(s, `only ${uniq.size} distinct internal links`);
  for (const l of uniq) {
    const ok = STATIC_PAGES.has(l) || (l.startsWith("/ratgeber/") && allSlugs.has(l.replace("/ratgeber/", "")));
    if (!ok) err(s, `broken internal link ${l}`);
  }
  for (const r of meta.related || []) if (!allSlugs.has(r)) err(s, `unknown related slug ${r}`);
  if (meta.howto && parseHowTo(body).length < 3) err(s, "howto: true but no ordered list with >=3 steps");
  if (/\*[^*\s][^*]*\*(?!\*)/.test(body.replace(/\*\*[^*]+\*\*/g, ""))) warn(s, "single-asterisk emphasis (renderer has no italics)");
  if (/\b(TODO|XXX|lorem)\b/i.test(body)) err(s, "placeholder text");
}

if (errors) {
  console.error(`\n${errors} error(s), ${warnings} warning(s) - nothing written.`);
  process.exit(1);
}
console.log(`${pkgs.length} package(s) validated, ${warnings} warning(s).`);
if (DRY) process.exit(0);

// ---- write phase ----
const ready = pkgs.filter((p) => p.meta.status === "ready" && !existingSlugs.has(p.meta.slug)).sort((a, b) => a.meta.rank - b.meta.rank);
if (!ready.length) {
  console.log("Nothing new to insert.");
  process.exit(0);
}

const entries = [];
for (const p of ready) {
  const { meta, title, body } = p;
  const faqs = parseFaq(body);
  const steps = meta.howto ? parseHowTo(body) : [];
  const schema = buildSchema(meta, title, faqs, steps);
  const J = (v) => JSON.stringify(v);
  const schemaJson = JSON.stringify(schema, null, 2).split("\n").map((l, i) => (i === 0 ? l : "    " + l)).join("\n");
  entries.push(`  {
    slug: ${J(meta.slug)},
    title: ${J(title)},
    titleTag: ${J(meta.title_tag)},
    metaDescription: ${J(meta.meta_description)},
    category: ${J(meta.category)},
    author: ${J(meta.author)},
    date: ${J(meta.date)},
    primaryKeyword: ${J(meta.primary_keyword)},
    intent: ${J(meta.intent)},
    heroImage: ${J(meta.hero_image)},
    heroImageAlt: ${J(meta.hero_alt)},
    bodyImage: ${J(meta.body_image)},
    bodyImageAlt: ${J(meta.body_alt)},
    secondaryKeywords: ${J(meta.secondary_keywords)},
    bodyMarkdown: ${J(body)},
    schema: ${schemaJson},
  },`);
  // audit trail: write schema back into the package
  const raw = fs.readFileSync(p.file, "utf8").replace(/\n## Schema[\s\S]*$/, "").trimEnd();
  fs.writeFileSync(p.file, `${raw}\n\n## Schema\n\n\`\`\`json\n${JSON.stringify(schema, null, 2)}\n\`\`\`\n`);
}

let postsSrc = fs.readFileSync(POSTS_FILE, "utf8");
const marker = "export const blogPosts: BlogPost[] = [\n";
if (!postsSrc.includes(marker)) throw new Error("blogPosts array marker not found");
postsSrc = postsSrc.replace(marker, marker + entries.join("\n") + "\n");
fs.writeFileSync(POSTS_FILE, postsSrc);

// related posts
const related = { ...(await loadTs(RELATED_FILE)).relatedPostSlugs };
for (const p of ready) related[p.meta.slug] = p.meta.related;
const extras = fs.existsSync(EXTRAS_FILE) ? JSON.parse(fs.readFileSync(EXTRAS_FILE, "utf8")) : {};
for (const [slug, add] of Object.entries(extras)) {
  if (!related[slug]) continue;
  for (const a of add) if (!related[slug].includes(a) && related[slug].length < 6) related[slug].push(a);
}
const relOut = "export const relatedPostSlugs: Record<string, string[]> = {\n" +
  Object.entries(related).map(([k, v]) => `  ${JSON.stringify(k)}: [\n${v.map((s) => `    ${JSON.stringify(s)},`).join("\n")}\n  ],`).join("\n") + "\n};\n";
fs.writeFileSync(RELATED_FILE, relOut);

// sitemap
let sm = fs.readFileSync(SITEMAP_FILE, "utf8");
const today = ready[0].meta.date;
const urlBlocks = ready.map((p) => `  <url>\n    <loc>${SITE}/ratgeber/${p.meta.slug}</loc>\n    <lastmod>${p.meta.date}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`).join("");
sm = sm.replace("</urlset>", urlBlocks + "</urlset>");
sm = sm.replace(/(<loc>https:\/\/www\.waschbar\.eu\/ratgeber<\/loc>\s*<lastmod>)[^<]+/, `$1${today}`);
fs.writeFileSync(SITEMAP_FILE, sm);

// llms.txt
let llms = fs.readFileSync(LLMS_FILE, "utf8");
const llmsLines = ready.map((p) => `- [${p.title}](${SITE}/ratgeber/${p.meta.slug}): ${p.meta.meta_description}`).join("\n");
llms = llms.replace(/(## Ratgeber\n\n[\s\S]*?)(\n\n## Kontakt)/, `$1\n${llmsLines}$2`);
fs.writeFileSync(LLMS_FILE, llms);

console.log(`Inserted ${ready.length} post(s): ${ready.map((p) => p.meta.slug).join(", ")}`);
