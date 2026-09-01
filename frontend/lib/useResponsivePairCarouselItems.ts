'use client';

import { useCallback, useEffect, useState } from 'react';

const TABLET_MQ = '(min-width: 768px) and (max-width: 1023px)';

export function isCarouselPair<T>(slide: T | readonly T[]): slide is readonly T[] {
  return Array.isArray(slide);
}

export function useResponsivePairCarouselItems<T>(
  items: readonly T[],
  pairs: readonly (readonly T[])[],
) {
  const getItems = useCallback((): readonly (T | readonly T[])[] => {
    if (typeof window !== 'undefined' && window.matchMedia(TABLET_MQ).matches) {
      return pairs;
    }
    return items;
  }, [items, pairs]);

  const [carouselItems, setCarouselItems] = useState<readonly (T | readonly T[])[]>(() =>
    typeof window !== 'undefined' ? getItems() : items,
  );

  const syncItems = useCallback(() => {
    setCarouselItems(getItems());
  }, [getItems]);

  useEffect(() => {
    const tabletMq = window.matchMedia(TABLET_MQ);
    const scrollableMq = window.matchMedia('(max-width: 1023px)');

    const onChange = () => {
      if (scrollableMq.matches) {
        syncItems();
      }
    };

    onChange();
    tabletMq.addEventListener('change', onChange);
    window.addEventListener('resize', onChange);
    return () => {
      tabletMq.removeEventListener('change', onChange);
      window.removeEventListener('resize', onChange);
    };
  }, [syncItems]);

  return carouselItems;
}
