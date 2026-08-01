import { Icon } from "./Icon";
import { GoogleLogo } from "./GoogleLogo";
import { type Review } from "../data/site-data";

function splitReviews(reviews: Review[]) {
  const midpoint = Math.ceil(reviews.length / 2);
  const firstRow = reviews.slice(0, midpoint);
  const secondRow = reviews.slice(midpoint);

  return [firstRow, secondRow.length > 0 ? secondRow : firstRow];
}

function fillLoop(reviews: Review[], minimumItems = 10) {
  if (reviews.length === 0) {
    return reviews;
  }

  const filled: Review[] = [];

  while (filled.length < minimumItems) {
    filled.push(...reviews);
  }

  return filled;
}

function ReviewCard({ review, ariaHidden }: { review: Review; ariaHidden?: boolean }) {
  return (
    <article className="marquee-review-card" aria-hidden={ariaHidden}>
      <p className="review-stars" aria-label="5 von 5 Sternen">★★★★★</p>
      <h3>{review.title}</h3>
      <p>{review.quote}</p>
      <div>
        <strong>{review.name}</strong>
        <span>{review.city} · {review.age}</span>
      </div>
    </article>
  );
}

function ReviewMarquee({
  reviews,
  reverse,
  label,
}: {
  reviews: Review[];
  reverse?: boolean;
  label: string;
}) {
  return (
    <div
      className={reverse ? "reviews-marquee reviews-marquee--reverse" : "reviews-marquee"}
      aria-label={label}
    >
      <div className="reviews-track">
        {reviews.map((review, index) => (
          <ReviewCard review={review} key={`a-${review.name}-${review.city}-${index}`} />
        ))}
        {reviews.map((review, index) => (
          <ReviewCard
            review={review}
            ariaHidden
            key={`b-${review.name}-${review.city}-${index}`}
          />
        ))}
      </div>
    </div>
  );
}

export function ReviewMarqueeSection({
  reviews,
  title = "Beispielstimmen aus dem Waschsalon.",
  subtitle = "Realistische Beispielstimmen aus Heidelberg und Ludwigshafen.",
  ratingLabel = "5.0",
  ratingSource = "Basierend auf Google Bewertungen",
  mapsUrl,
}: {
  reviews: Review[];
  title?: string;
  subtitle?: string;
  ratingLabel?: string;
  ratingSource?: string;
  mapsUrl?: string;
}) {
  const [firstRowSource, secondRowSource] = splitReviews(reviews);
  const firstRow = fillLoop(firstRowSource, 12);
  const secondRow = fillLoop(secondRowSource, 12);
  const summary = (
    <>
      <span className="rating-summary__logo">
        <GoogleLogo />
      </span>
      <div className="rating-summary__content">
        <strong>{ratingLabel}</strong>
        <span>{ratingSource}</span>
      </div>
    </>
  );

  return (
    <section className="section reviews-section" id="bewertungen" aria-labelledby="reviews-title">
      <div className="reviews-section__header">
        <p className="section-kicker">Bewertungen</p>
        <h2 id="reviews-title">{title}</h2>
        <div className="rating-summary" aria-label={`${ratingLabel} ${ratingSource}`}>
          {mapsUrl ? (
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
              {summary}
            </a>
          ) : (
            summary
          )}
          <div className="rating-summary__credentials" aria-label="Weitere Vertrauenssignale">
            <span className="rating-summary__badge">
              <Icon name="shield" />
              Hygienisch sauber
            </span>
            <span className="rating-summary__badge">
              <Icon name="clock" />
              Täglich 06-24 Uhr
            </span>
          </div>
        </div>
        <p className="reviews-section__subtitle">{subtitle}</p>
      </div>

      <ReviewMarquee reviews={firstRow} label="Kundenstimmen" />
      <ReviewMarquee reviews={secondRow} reverse label="Weitere Kundenstimmen" />
    </section>
  );
}
