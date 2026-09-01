'use client';

import { VALUE_CARDS } from '@/data/content';
import { ScrollCarousel } from './ScrollCarousel';

type ValueCardData = (typeof VALUE_CARDS)[number];

export function ValueCardContent({ card }: { card: ValueCardData }) {
  return (
    <>
      <div className="num">{card.num}</div>
      <h3>{card.title}</h3>
      <p>{card.body}</p>
    </>
  );
}

export function ValueCardsCarousel() {
  return (
    <ScrollCarousel
      items={VALUE_CARDS}
      scrollableMq="(max-width: 767px)"
      classNames={{
        root: 'value-carousel',
        track: 'value-grid value-grid--carousel',
        navPrev: 'value-nav value-nav--prev',
        navNext: 'value-nav value-nav--next',
        slide: 'value-card glass',
      }}
      renderSlide={card => <ValueCardContent card={card} />}
    />
  );
}
