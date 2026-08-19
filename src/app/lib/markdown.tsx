import type { ReactNode } from "react";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let index = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    if (match[1] !== undefined) {
      nodes.push(<strong key={`${keyPrefix}-b-${index}`}>{match[1]}</strong>);
    } else if (match[2] !== undefined) {
      const href = match[3];
      const isInternal = href.startsWith("/");
      nodes.push(
        <a
          key={`${keyPrefix}-a-${index}`}
          href={href}
          {...(!isInternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {match[2]}
        </a>
      );
    }
    lastIndex = pattern.lastIndex;
    index += 1;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

function isFaqHeading(text: string): boolean {
  return /häufige fragen|faq/i.test(text);
}

export function renderMarkdown(markdown: string): ReactNode[] {
  const lines = markdown.split("\n");
  const blocks: ReactNode[] = [];
  let faqBuffer: ReactNode[] = [];
  let i = 0;
  let blockKey = 0;
  let inFaqSection = false;

  const flushFaqBuffer = () => {
    if (faqBuffer.length > 0) {
      blocks.push(
        <div className="faq-list" key={`faq-list-${blockKey++}`}>
          {faqBuffer}
        </div>
      );
      faqBuffer = [];
    }
  };

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i += 1;
      continue;
    }

    // Heading
    const headingMatch = /^(#{2,3})\s+(.*)$/.exec(line);
    if (headingMatch) {
      flushFaqBuffer();
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      const id = slugify(text);
      inFaqSection = level === 2 && isFaqHeading(text);
      const key = `h-${blockKey++}`;
      if (level === 2) {
        blocks.push(
          <h2 key={key} id={id}>
            {renderInline(text, key)}
          </h2>
        );
      } else {
        blocks.push(
          <h3 key={key} id={id}>
            {renderInline(text, key)}
          </h3>
        );
      }
      i += 1;
      continue;
    }

    // Table
    if (line.trim().startsWith("|")) {
      flushFaqBuffer();
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i]);
        i += 1;
      }
      const rows = tableLines
        .map((l) =>
          l
            .trim()
            .replace(/^\|/, "")
            .replace(/\|$/, "")
            .split("|")
            .map((cell) => cell.trim())
        )
        .filter((cells) => !cells.every((cell) => /^:?-+:?$/.test(cell)));
      const [headerRow, ...bodyRows] = rows;
      const key = `t-${blockKey++}`;
      blocks.push(
        <div className="ratgeber-table-wrap" key={key}>
          <table>
            <thead>
              <tr>
                {headerRow.map((cell, ci) => (
                  <th key={`${key}-h-${ci}`}>{renderInline(cell, `${key}-h-${ci}`)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, ri) => (
                <tr key={`${key}-r-${ri}`}>
                  {row.map((cell, ci) => (
                    <td key={`${key}-r-${ri}-${ci}`}>{renderInline(cell, `${key}-r-${ri}-${ci}`)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Ordered list
    if (/^\d+\.\s+/.test(line.trim())) {
      flushFaqBuffer();
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i += 1;
      }
      const key = `ol-${blockKey++}`;
      blocks.push(
        <ol key={key}>
          {items.map((item, ii) => (
            <li key={`${key}-${ii}`}>{renderInline(item, `${key}-${ii}`)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // Unordered list
    if (/^[-*]\s+/.test(line.trim())) {
      flushFaqBuffer();
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ""));
        i += 1;
      }
      const key = `ul-${blockKey++}`;
      blocks.push(
        <ul key={key}>
          {items.map((item, ii) => (
            <li key={`${key}-${ii}`}>{renderInline(item, `${key}-${ii}`)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // FAQ question (bold-only line) inside a FAQ section
    const boldOnlyMatch = /^\*\*(.+?)\*\*$/.exec(line.trim());
    if (inFaqSection && boldOnlyMatch) {
      const question = boldOnlyMatch[1];
      const answerLines: string[] = [];
      i += 1;
      while (
        i < lines.length &&
        lines[i].trim() !== "" &&
        !/^(#{2,3})\s+/.test(lines[i]) &&
        !/^\*\*(.+?)\*\*$/.test(lines[i].trim())
      ) {
        answerLines.push(lines[i].trim());
        i += 1;
      }
      const answer = answerLines.join(" ");
      const key = `faq-${blockKey++}`;
      faqBuffer.push(
        <details className="faq-item" key={key}>
          <summary>
            <span className="faq-question">{question}</span>
            <span className="faq-toggle" aria-hidden="true" />
          </summary>
          <p>{renderInline(answer, key)}</p>
        </details>
      );
      continue;
    }

    // Paragraph
    flushFaqBuffer();
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^(#{2,3})\s+/.test(lines[i]) &&
      !lines[i].trim().startsWith("|") &&
      !/^\d+\.\s+/.test(lines[i].trim()) &&
      !/^[-*]\s+/.test(lines[i].trim()) &&
      !(inFaqSection && /^\*\*(.+?)\*\*$/.test(lines[i].trim()))
    ) {
      paraLines.push(lines[i]);
      i += 1;
    }
    const text = paraLines.join(" ").trim();
    if (text) {
      const key = `p-${blockKey++}`;
      blocks.push(<p key={key}>{renderInline(text, key)}</p>);
    }
  }

  flushFaqBuffer();
  return blocks;
}
