'use client';

import { type ReactNode } from 'react';
import { useInfiniteScrollCarousel } from '@/lib/useInfiniteScrollCarousel';

type ScrollCarouselProps<T> = {
  items: readonly T[];
  scrollableMq: string;
  classNames: {
    root: string;
    track: string;
    navPrev: string;
    navNext: string;
    slide: string;
  };
  renderSlide: (item: T) => ReactNode;
};

function NavIcon({ direction }: { direction: 'prev' | 'next' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d={direction === 'prev' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ScrollCarousel<T>({
  items,
  scrollableMq,
  classNames,
  renderSlide,
}: ScrollCarouselProps<T>) {
  const { trackRef, slides, isScrollable, goPrev, goNext } = useInfiniteScrollCarousel({
    items,
    scrollableMq,
  });

  return (
    <div className={classNames.root}>
      <button type="button" className={classNames.navPrev} onClick={goPrev} aria-label="이전 카드">
        <NavIcon direction="prev" />
      </button>

      <div className={`${classNames.track}${isScrollable ? ' is-scrollable' : ''}`} ref={trackRef}>
        {slides.map(slide => (
          <article key={slide.domKey} className={classNames.slide} aria-hidden={slide.isClone || undefined}>
            {renderSlide(slide.item)}
          </article>
        ))}
      </div>

      <button type="button" className={classNames.navNext} onClick={goNext} aria-label="다음 카드">
        <NavIcon direction="next" />
      </button>
    </div>
  );
}
