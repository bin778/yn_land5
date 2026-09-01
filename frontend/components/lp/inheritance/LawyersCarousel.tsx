'use client';

import { LAWYERS } from '@/data/content';
import { isCarouselPair, useResponsivePairCarouselItems } from '@/lib/useResponsivePairCarouselItems';
import { LawyerCard } from './LawyerCard';
import { ScrollCarousel } from './ScrollCarousel';

const LAWYER_PAIRS = [LAWYERS.slice(0, 2), LAWYERS.slice(2, 4)] as const;

export function LawyersCarousel() {
  const items = useResponsivePairCarouselItems(LAWYERS, LAWYER_PAIRS);

  return (
    <ScrollCarousel
      items={items}
      scrollableMq="(max-width: 1023px)"
      classNames={{
        root: 'lawyer-carousel',
        track: 'lawyer-grid lawyer-grid--carousel',
        navPrev: 'lawyer-nav lawyer-nav--prev',
        navNext: 'lawyer-nav lawyer-nav--next',
        slide: 'lawyer-slide',
      }}
      renderSlide={slide =>
        isCarouselPair(slide) ? (
          slide.map(lawyer => <LawyerCard key={lawyer.name} lawyer={lawyer} />)
        ) : (
          <LawyerCard lawyer={slide} />
        )
      }
    />
  );
}
