'use client';

import { PROBLEMS } from '@/data/content';
import { ScrollCarousel } from './ScrollCarousel';

export function ProblemCarousel() {
  return (
    <ScrollCarousel
      items={PROBLEMS}
      scrollableMq="(max-width: 767px)"
      classNames={{
        root: 'problem-carousel',
        track: 'problem-grid',
        navPrev: 'problem-nav problem-nav--prev',
        navNext: 'problem-nav problem-nav--next',
        slide: 'problem-card',
      }}
      renderSlide={item => (
        <>
          <div className="problem-icon">{item.icon}</div>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </>
      )}
    />
  );
}
