"use client";

import Image from "next/image";
import { useRef } from "react";
import { Icon } from "./Icon";

type MobileUseStory = {
  title: string;
  copy: string;
  image: string;
  icon: string;
  shortLabel: string;
};

export function MobileUseCarousel({ stories }: { stories: MobileUseStory[] }) {
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  const goToStory = (index: number) => {
    cardRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <div className="mobile-use-carousel" aria-label="Wofür Waschbar gedacht ist">
      <p className="section-kicker">Wofür Waschbar gedacht ist</p>
      <h2>Self-Service Waschen für echte Alltagssituationen</h2>
      <div className="mobile-use-scroll">
        {stories.map((story, index) => (
          <article
            className="mobile-use-card"
            key={story.title}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
          >
            <div className="mobile-use-image">
              <Image src={story.image} alt="" fill sizes="100vw" />
            </div>
            <div className="mobile-use-card-content">
              <span className="mobile-use-number">{index + 1}</span>
              <h3>{story.title}</h3>
              <p>{story.copy}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mobile-use-icons" aria-label="Einsatzbereiche">
        {stories.map((item, index) => (
          <button
            key={`${item.title}-icon`}
            onClick={() => goToStory(index)}
            type="button"
          >
            <Icon name={item.icon} />
            <span>{item.shortLabel}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
