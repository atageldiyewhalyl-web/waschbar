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
            Das erste SB-Wasch-Abo in Heidelberg
          </span>
          <div className="subscription-campaign-price">
            <strong>29,99 €</strong>
            <span>
              statt <s>85 €</s>
            </span>
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
              <strong>Spare über 60%</strong>
              <small>mit Kundenkarte</small>
            </div>
          </div>
        </div>
        <div className="subscription-campaign-included" aria-label="Abo Vorteile">
          <div className="subscription-campaign-included-item">
            <LottieIcon src="/animations/washing-machine.json" label="Waschmaschine Animation" />
            <strong>10 Waschgänge</strong>
          </div>
          <div className="subscription-campaign-divider" aria-hidden="true" />
          <div className="subscription-campaign-included-item">
            <LottieIcon src="/animations/laundry-2.json" label="Trockner Animation" />
            <div>
              <strong>10 Trocknergänge</strong>
              <small>je 20 Minuten</small>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
