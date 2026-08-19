import type { Metadata } from "next";
import { BlogCard } from "../components/BlogCard";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { blogPosts } from "../data/blog-posts";
import { absoluteUrl } from "../seo";

export const dynamic = "force-static";
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Ratgeber | Waschtipps & Waschsalon-Guides | Waschbar",
  description:
    "Wäsche-Ratgeber von Waschbar: Waschtemperaturen, Fleckenentfernung, Bettdecken waschen und praktische Guides zu unseren SB-Waschsalons in Heidelberg und Ludwigshafen.",
  alternates: {
    canonical: "/ratgeber",
  },
  openGraph: {
    title: "Ratgeber | Waschtipps & Waschsalon-Guides | Waschbar",
    description:
      "Praktische Wäsche-Tipps und Guides zu den Waschbar SB-Waschsalons in Heidelberg und Ludwigshafen.",
    url: absoluteUrl("/ratgeber"),
    type: "website",
    images: ["/images/waschbar-use-cases-scene-v2.webp"],
  },
};

function RatgeberCollectionJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Waschbar Ratgeber",
    url: absoluteUrl("/ratgeber"),
    description: metadata.description,
    isPartOf: {
      "@type": "WebSite",
      name: "Waschbar",
      url: absoluteUrl("/"),
    },
    hasPart: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: absoluteUrl(`/ratgeber/${post.slug}`),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function RatgeberBreadcrumbJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Waschbar", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Ratgeber", item: absoluteUrl("/ratgeber") },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function RatgeberIndexPage() {
  return (
    <>
      <RatgeberCollectionJsonLd />
      <RatgeberBreadcrumbJsonLd />
      <main className="site-shell ratgeber-shell">
        <SiteHeader />

        <section className="ratgeber-intro">
          <p className="section-kicker">Ratgeber</p>
          <h1>Wäsche-Tipps &amp; Waschsalon-Guides</h1>
          <p className="ratgeber-intro-copy">
            Praktisches Wissen rund um Waschen, Trocknen und den Alltag im
            SB-Waschsalon – von Waschtemperaturen über Fleckenentfernung bis
            zu Guides für Heidelberg und Ludwigshafen.
          </p>
        </section>

        <section className="section ratgeber-grid-section">
          <div className="blog-grid">
            {blogPosts.map((post, index) => (
              <BlogCard post={post} key={post.slug} priority={index < 2} />
            ))}
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
