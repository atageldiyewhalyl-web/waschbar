import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "../data/blog-posts";
import { estimateReadingMinutes } from "../lib/reading-time";

const intentLabels: Record<string, string> = {
  local: "Standort-Guide",
  commercial: "Kostenvergleich",
  informational: "Ratgeber",
};

export function BlogCard({ post, priority = false }: { post: BlogPost; priority?: boolean }) {
  const minutes = estimateReadingMinutes(post.bodyMarkdown);

  return (
    <Link className="blog-card" href={`/ratgeber/${post.slug}`}>
      <div className="blog-card-media">
        <Image
          src={post.heroImage}
          alt={post.heroImageAlt}
          fill
          priority={priority}
          sizes="(max-width: 900px) 100vw, 380px"
        />
        <span className="blog-card-badge">{intentLabels[post.intent] ?? "Ratgeber"}</span>
      </div>
      <div className="blog-card-body">
        <p className="blog-card-meta">
          {post.category} · {minutes} Min. Lesezeit
        </p>
        <h3>{post.title}</h3>
        <p className="blog-card-excerpt">{post.metaDescription}</p>
        <span className="blog-card-link">
          Weiterlesen <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
