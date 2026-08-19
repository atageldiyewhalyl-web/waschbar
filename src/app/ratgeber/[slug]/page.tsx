import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCard } from "../../components/BlogCard";
import { Icon } from "../../components/Icon";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { blogPosts, getBlogPost } from "../../data/blog-posts";
import { relatedPostSlugs } from "../../data/related-posts";
import { renderMarkdown } from "../../lib/markdown";
import { estimateReadingMinutes } from "../../lib/reading-time";
import { absoluteUrl } from "../../seo";

export const dynamic = "force-static";
export const revalidate = 86400;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) {
    return {};
  }

  return {
    title: post.titleTag,
    description: post.metaDescription,
    alternates: {
      canonical: `/ratgeber/${post.slug}`,
    },
    keywords: [post.primaryKeyword, ...post.secondaryKeywords],
    openGraph: {
      title: post.titleTag,
      description: post.metaDescription,
      url: absoluteUrl(`/ratgeber/${post.slug}`),
      type: "article",
      images: [post.heroImage],
      locale: "de_DE",
      siteName: "Waschbar",
    },
    twitter: {
      card: "summary_large_image",
      title: post.titleTag,
      description: post.metaDescription,
      images: [post.heroImage],
    },
  };
}

function ArticleJsonLd({ schema }: { schema: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function BreadcrumbJsonLd({ title, slug }: { title: string; slug: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Waschbar", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Ratgeber", item: absoluteUrl("/ratgeber") },
      { "@type": "ListItem", position: 3, name: title, item: absoluteUrl(`/ratgeber/${slug}`) },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) {
    notFound();
  }

  const minutes = estimateReadingMinutes(post.bodyMarkdown);
  const blocks = renderMarkdown(post.bodyMarkdown);
  const relatedSlugs = relatedPostSlugs[post.slug] ?? [];
  const relatedPosts = relatedSlugs
    .map((slug) => getBlogPost(slug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  // Insert the body image roughly a third of the way through the article.
  const insertAt = Math.max(2, Math.floor(blocks.length / 3));
  const blocksWithImage = [
    ...blocks.slice(0, insertAt),
    <figure className="ratgeber-body-image" key="body-image">
      <Image
        src={post.bodyImage}
        alt={post.bodyImageAlt}
        width={1200}
        height={800}
        sizes="(max-width: 900px) 100vw, 1040px"
      />
    </figure>,
    ...blocks.slice(insertAt),
  ];

  const dateLabel = new Date(post.date).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <ArticleJsonLd schema={post.schema} />
      <BreadcrumbJsonLd title={post.title} slug={post.slug} />
      <main className="site-shell ratgeber-shell">
        <SiteHeader />

        <nav className="ratgeber-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Waschbar</Link>
          <span aria-hidden="true">/</span>
          <Link href="/ratgeber">Ratgeber</Link>
          <span aria-hidden="true">/</span>
          <span>{post.title}</span>
        </nav>

        <article className="ratgeber-article">
          <header className="ratgeber-article-header">
            <p className="section-kicker">{post.category}</p>
            <h1>{post.title}</h1>
            <p className="ratgeber-article-meta">
              {post.author} · {dateLabel} · {minutes} Min. Lesezeit
            </p>
          </header>

          <div className="ratgeber-article-hero">
            <Image
              src={post.heroImage}
              alt={post.heroImageAlt}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 1040px"
            />
          </div>

          <div className="ratgeber-article-body">{blocksWithImage}</div>

          <div className="ratgeber-cta-band">
            <div>
              <p className="section-kicker">SB-Wasch-Abo</p>
              <h2>Regelmäßig waschen? Jetzt sparen.</h2>
              <p>
                10 Waschgänge und 10 Trocknergänge für 29,99 € im Monat, gültig
                in Heidelberg und Ludwigshafen.
              </p>
            </div>
            <div className="ratgeber-cta-actions">
              <Link className="button button-primary" href="/rabattkarte">
                Mitgliedskarte ansehen <Icon name="card" />
              </Link>
              <Link className="button button-outline" href="/heidelberg">
                Standorte finden <Icon name="pin" />
              </Link>
            </div>
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <section className="section ratgeber-related-section" aria-label="Weitere Ratgeber-Artikel">
            <p className="section-kicker">Weiterlesen</p>
            <h2>Das könnte dich auch interessieren</h2>
            <div className="blog-grid blog-grid-related">
              {relatedPosts.map((related) => (
                <BlogCard post={related} key={related.slug} />
              ))}
            </div>
          </section>
        )}

        <SiteFooter />
      </main>
    </>
  );
}
