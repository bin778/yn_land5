'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { PROBLEMS } from '@/data/content';

const MOBILE_MQ = '(max-width: 767px)';

export function ProblemCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const getClosestIndex = useCallback((container: HTMLDivElement) => {
    const viewCenter = container.scrollLeft + container.offsetWidth / 2;
    let closest = 0;
    let minDiff = Infinity;

    Array.from(container.children).forEach((child, index) => {
      const el = child as HTMLElement;
      const childCenter = el.offsetLeft + el.offsetWidth / 2;
      const diff = Math.abs(childCenter - viewCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closest = index;
      }
    });

    return closest;
  }, []);

  const syncFromUserScroll = useCallback(() => {
    const container = trackRef.current;
    if (!container) return;

    const closest = getClosestIndex(container);
    setActiveIndex(closest);
    setAtStart(closest === 0);
    setAtEnd(closest === PROBLEMS.length - 1);
  }, [getClosestIndex]);

  const scrollToIndex = useCallback((index: number) => {
    const container = trackRef.current;
    if (!container) return;

    const normalized = Math.min(Math.max(0, index), PROBLEMS.length - 1);
    const child = container.children[normalized] as HTMLElement | undefined;
    if (!child) return;

    const targetLeft = child.offsetLeft - container.offsetWidth / 2 + child.offsetWidth / 2;
    isProgrammaticScroll.current = true;
    container.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
    setActiveIndex(normalized);
    setAtStart(normalized === 0);
    setAtEnd(normalized === PROBLEMS.length - 1);
  }, []);

  const handleScroll = useCallback(() => {
    if (!window.matchMedia(MOBILE_MQ).matches) return;
    if (isProgrammaticScroll.current) return;
    syncFromUserScroll();
  }, [syncFromUserScroll]);

  useEffect(() => {
    const container = trackRef.current;
    if (!container) return;

    const onScrollEnd = () => {
      if (isProgrammaticScroll.current) {
        isProgrammaticScroll.current = false;
        return;
      }
      if (!window.matchMedia(MOBILE_MQ).matches) return;
      syncFromUserScroll();
    };

    container.addEventListener('scrollend', onScrollEnd);
    return () => container.removeEventListener('scrollend', onScrollEnd);
  }, [syncFromUserScroll]);

  const goPrev = () => scrollToIndex(activeIndex - 1);
  const goNext = () => scrollToIndex(activeIndex + 1);

  return (
    <div className="problem-carousel">
      <button
        type="button"
        className="problem-nav problem-nav--prev"
        onClick={goPrev}
        disabled={atStart}
        aria-label="이전 카드"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M15 18l-6-6 6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="problem-grid" ref={trackRef} onScroll={handleScroll}>
        {PROBLEMS.map(item => (
          <article key={item.title} className="problem-card">
            <div className="problem-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>

      <button
        type="button"
        className="problem-nav problem-nav--next"
        onClick={goNext}
        disabled={atEnd}
        aria-label="다음 카드"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M9 18l6-6-6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
