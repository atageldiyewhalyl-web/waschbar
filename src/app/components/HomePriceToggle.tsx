"use client";

import Image from "next/image";
import { type PriceItem } from "../data/site-data";
import { Icon } from "./Icon";
import { LottieIcon } from "./LottieIcon";
import { PriceCard } from "./PriceCard";

export function HomePriceToggle({ items }: { items: PriceItem[] }) {
  return (
    <div className="home-price-stack">
      <div className="price-grid">
        {items.map((item) => (
          <PriceCard item={item} key={item.title} />
        ))}
      </div>

      <article className="subscription-campaign-panel">
        <div className="subscription-campaign-offer">
          <span className="subscription-campaign-pill">
            Zeitlich begrenzt: 6,50 € Startguthaben
          </span>
          <div className="subscription-campaign-price">
            <strong>10 %</strong>
            <span>Rabatt auf jeden Einkauf</span>
          </div>
          <Image
            className="subscription-campaign-card"
            src="/images/generated/waschbar-abo-rabattkarte-cutout.png"
            alt="Waschbar Mitgliedskarte"
            width={1536}
            height={1024}
            sizes="(max-width: 700px) 58vw, 340px"
          />
          <div className="subscription-campaign-save">
            <span>
              <Icon name="percent" />
            </span>
            <div>
              <strong>6,50 € Startguthaben</strong>
              <small>beim Kauf der Mitgliedskarte</small>
            </div>
          </div>
        </div>
        <div className="subscription-campaign-included" aria-label="Startguthaben Vorteile">
          <div className="subscription-campaign-included-item">
            <LottieIcon src="/animations/washing-machine.json" label="Waschmaschine Animation" />
            <div>
              <strong>1 Waschgang</strong>
              <small>gratis</small>
            </div>
          </div>
          <div className="subscription-campaign-divider" aria-hidden="true" />
          <div className="subscription-campaign-included-item">
            <LottieIcon src="/animations/laundry-2.json" label="Trockner Animation" />
            <div>
              <strong>10 Min. Trocknen</strong>
              <small>gratis</small>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
