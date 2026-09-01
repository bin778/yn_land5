'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { QUOTES } from '@/data/content';

const TABLET_MQ = '(min-width: 768px) and (max-width: 1023px)';
const SCROLLABLE_MQ = '(max-width: 1023px)';
const SCROLL_EDGE = 16;

export function QuoteCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);
  const [tabletView, setTabletView] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(TABLET_MQ);
    const onChange = () => setTabletView(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const getScrollEdges = useCallback(
    (container: HTMLDivElement) => {
      const maxScroll = container.scrollWidth - container.offsetWidth;
      const scrollLeft = container.scrollLeft;

      if (tabletView) {
        const ratio = maxScroll > 0 ? scrollLeft / maxScroll : 0;
        return {
          maxScroll,
          atStart: ratio < 0.2,
          atEnd: maxScroll <= 0 || ratio > 0.8,
        };
      }

      return {
        maxScroll,
        atStart: scrollLeft <= SCROLL_EDGE,
        atEnd: maxScroll <= 0 || scrollLeft >= maxScroll - SCROLL_EDGE,
      };
    },
    [tabletView],
  );

  const getClosestMobileIndex = useCallback((container: HTMLDivElement) => {
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

    if (tabletView) {
      const { atStart: start, atEnd: end } = getScrollEdges(container);
      setAtStart(start);
      setAtEnd(end);
      return;
    }

    const closest = getClosestMobileIndex(container);
    setActiveIndex(closest);
    setAtStart(closest === 0);
    setAtEnd(closest === QUOTES.length - 1);
  }, [getClosestMobileIndex, getScrollEdges, tabletView]);

  const scrollToStart = useCallback(() => {
    const container = trackRef.current;
    if (!container) return;

    isProgrammaticScroll.current = true;
    container.scrollTo({ left: 0, behavior: 'smooth' });
    setActiveIndex(0);
    setAtStart(true);
    setAtEnd(false);
  }, []);

  const scrollToEnd = useCallback(() => {
    const container = trackRef.current;
    if (!container) return;

    const { maxScroll } = getScrollEdges(container);
    isProgrammaticScroll.current = true;
    container.scrollTo({ left: Math.max(0, maxScroll), behavior: 'smooth' });
    setActiveIndex(QUOTES.length - 2);
    setAtStart(false);
    setAtEnd(true);
  }, [getScrollEdges]);

  const scrollToMobileIndex = useCallback((index: number) => {
    const container = trackRef.current;
    if (!container) return;

    const normalized = Math.min(Math.max(0, index), QUOTES.length - 1);
    const child = container.children[normalized] as HTMLElement | undefined;
    if (!child) return;

    const targetLeft = child.offsetLeft - container.offsetWidth / 2 + child.offsetWidth / 2;
    isProgrammaticScroll.current = true;
    container.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
    setActiveIndex(normalized);
    setAtStart(normalized === 0);
    setAtEnd(normalized === QUOTES.length - 1);
  }, []);

  const handleScroll = useCallback(() => {
    if (!window.matchMedia(SCROLLABLE_MQ).matches) return;
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
      syncFromUserScroll();
    };

    container.addEventListener('scrollend', onScrollEnd);
    return () => container.removeEventListener('scrollend', onScrollEnd);
  }, [syncFromUserScroll]);

  const goPrev = () => {
    if (tabletView) {
      scrollToStart();
      return;
    }
    scrollToMobileIndex(activeIndex - 1);
  };

  const goNext = () => {
    if (tabletView) {
      scrollToEnd();
      return;
    }
    scrollToMobileIndex(activeIndex + 1);
  };

  return (
    <div className="quote-carousel">
      <button
        type="button"
        className="quote-nav quote-nav--prev"
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

      <div className="quote-grid" ref={trackRef} onScroll={handleScroll}>
        {QUOTES.map(quote => (
          <article key={quote.tag} className="quote-card">
            <p>{quote.text}</p>
            <small>{quote.tag}</small>
          </article>
        ))}
      </div>

      <button
        type="button"
        className="quote-nav quote-nav--next"
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
