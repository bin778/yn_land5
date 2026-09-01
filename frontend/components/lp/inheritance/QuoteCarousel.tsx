'use client';

import { QUOTES } from '@/data/content';
import { isCarouselPair, useResponsivePairCarouselItems } from '@/lib/useResponsivePairCarouselItems';
import { ScrollCarousel } from './ScrollCarousel';

const QUOTE_PAIRS = [QUOTES.slice(0, 2), QUOTES.slice(2, 4)] as const;

type Quote = (typeof QUOTES)[number];

function QuoteCard({ quote }: { quote: Quote }) {
  return (
    <article className="quote-card">
      <p>{quote.text}</p>
      <small>{quote.tag}</small>
    </article>
  );
}

export function QuoteCarousel() {
  const items = useResponsivePairCarouselItems(QUOTES, QUOTE_PAIRS);

  return (
    <ScrollCarousel
      items={items}
      scrollableMq="(max-width: 1023px)"
      classNames={{
        root: 'quote-carousel',
        track: 'quote-grid',
        navPrev: 'quote-nav quote-nav--prev',
        navNext: 'quote-nav quote-nav--next',
        slide: 'quote-slide',
      }}
      renderSlide={slide =>
        isCarouselPair(slide) ? (
          slide.map(quote => <QuoteCard key={quote.tag} quote={quote} />)
        ) : (
          <QuoteCard quote={slide} />
        )
      }
    />
  );
}
