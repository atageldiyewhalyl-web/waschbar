import Image from "next/image";
import { LottieIcon } from "./LottieIcon";
import { type PriceItem } from "../data/site-data";

export function PriceCard({ item }: { item: PriceItem }) {
  return (
    <article
      className={item.featured ? "price-card price-card-featured" : "price-card"}
      tabIndex={item.programPreview ? 0 : undefined}
    >
      {item.featured && <span className="price-card-ribbon">Beliebt</span>}
      <span className="price-card-badge">{item.badge}</span>
      <div className="price-card-top">
        <LottieIcon src={item.animation} label={`${item.title} Animation`} />
      </div>
      <p className="price-card-category">{item.category}</p>
      <h3>{item.title}</h3>
      <div className="price-value">
        <strong>{item.price}</strong>
        <span className="price-value-meta">{item.meta}</span>
      </div>
      <ul className="price-card-features">
        {item.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <p className="price-card-footnote">{item.footnote}</p>
      {item.programPreview && (
        <div
          className={`price-program-preview price-program-preview-${item.programPreview.placement}`}
          aria-hidden="true"
        >
          <Image
            src={item.programPreview.image}
            alt={item.programPreview.alt}
            fill
            sizes="(max-width: 900px) 86vw, 440px"
          />
        </div>
      )}
    </article>
  );
}
