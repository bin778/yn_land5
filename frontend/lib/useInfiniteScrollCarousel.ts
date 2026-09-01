'use client';

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

const FIRST_REAL_INDEX = 1;
const TRAILING_CLONE_COUNT = 1;

type Slide<T> = {
  item: T;
  domKey: string;
  isClone: boolean;
};

type UseInfiniteScrollCarouselOptions<T> = {
  items: readonly T[];
  scrollableMq: string;
};

function getScrollLeft(container: HTMLDivElement, child: HTMLElement) {
  return child.offsetLeft - container.offsetWidth / 2 + child.offsetWidth / 2;
}

function getClosestDomIndex(container: HTMLDivElement) {
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
}

function setRealIndexFromDom(domIndex: number, itemCount: number) {
  if (domIndex === 0) {
    return itemCount - 1;
  }
  if (domIndex > itemCount) {
    return domIndex - itemCount - 1;
  }
  return domIndex - 1;
}

export function useInfiniteScrollCarousel<T>({ items, scrollableMq }: UseInfiniteScrollCarouselOptions<T>) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isJumping = useRef(false);
  const realIndexRef = useRef(0);
  const didInitScroll = useRef(false);
  const [isScrollable, setIsScrollable] = useState(false);

  const loopable = items.length > 1;

  const slides = useMemo<Slide<T>[]>(() => {
    if (!isScrollable || !loopable) {
      return items.map((item, index) => ({
        item,
        domKey: String(index),
        isClone: false,
      }));
    }

    const trailingClones = Array.from({ length: TRAILING_CLONE_COUNT }, (_, index) => ({
      item: items[index % items.length],
      domKey: `clone-next-${index}`,
      isClone: true,
    }));

    return [
      { item: items[items.length - 1], domKey: 'clone-prev', isClone: true },
      ...items.map((item, index) => ({
        item,
        domKey: `item-${index}`,
        isClone: false,
      })),
      ...trailingClones,
    ];
  }, [isScrollable, items, loopable]);

  useEffect(() => {
    const mq = window.matchMedia(scrollableMq);
    const onChange = () => {
      setIsScrollable(mq.matches);
    };
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [scrollableMq]);

  const scrollToDomIndex = useCallback(
    (domIndex: number, behavior: ScrollBehavior) => {
      const container = trackRef.current;
      if (!container) return;

      const child = container.children[domIndex] as HTMLElement | undefined;
      if (!child) return;

      const targetLeft = getScrollLeft(container, child);
      isJumping.current = behavior === 'auto';
      container.scrollTo({ left: Math.max(0, targetLeft), behavior });

      if (!loopable || !isScrollable) {
        realIndexRef.current = domIndex;
        return;
      }

      realIndexRef.current = setRealIndexFromDom(domIndex, items.length);
    },
    [isScrollable, items.length, loopable],
  );

  const handleScrollEnd = useCallback(() => {
    const container = trackRef.current;
    if (!container || !isScrollable) return;

    if (isJumping.current) {
      isJumping.current = false;
      return;
    }

    if (!loopable) return;

    const closest = getClosestDomIndex(container);
    if (closest === 0) {
      scrollToDomIndex(items.length, 'auto');
      return;
    }

    if (closest > items.length) {
      scrollToDomIndex(FIRST_REAL_INDEX + (closest - items.length - 1), 'auto');
      return;
    }

    realIndexRef.current = closest - 1;
  }, [isScrollable, items.length, loopable, scrollToDomIndex]);

  useLayoutEffect(() => {
    if (!isScrollable || !loopable) {
      didInitScroll.current = false;
      return;
    }

    scrollToDomIndex(realIndexRef.current + FIRST_REAL_INDEX, 'auto');
    didInitScroll.current = true;
  }, [isScrollable, loopable, items.length, scrollToDomIndex]);

  useEffect(() => {
    const container = trackRef.current;
    if (!container) return;

    let scrollTimeout: ReturnType<typeof setTimeout> | undefined;

    const onScrollEnd = () => {
      handleScrollEnd();
    };

    const onScroll = () => {
      if (isJumping.current) return;
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScrollEnd, 120);
    };

    container.addEventListener('scrollend', onScrollEnd);
    container.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      container.removeEventListener('scrollend', onScrollEnd);
      container.removeEventListener('scroll', onScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [handleScrollEnd]);

  const goPrev = useCallback(() => {
    const container = trackRef.current;
    if (!container || !isScrollable || !loopable) return;

    const closest = getClosestDomIndex(container);
    scrollToDomIndex(closest - 1, 'smooth');
  }, [isScrollable, loopable, scrollToDomIndex]);

  const goNext = useCallback(() => {
    const container = trackRef.current;
    if (!container || !isScrollable || !loopable) return;

    const closest = getClosestDomIndex(container);
    scrollToDomIndex(closest + 1, 'smooth');
  }, [isScrollable, loopable, scrollToDomIndex]);

  return {
    trackRef,
    slides,
    isScrollable,
    goPrev,
    goNext,
  };
}
