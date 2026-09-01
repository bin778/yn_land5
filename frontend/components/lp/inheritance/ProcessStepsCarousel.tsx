'use client';

import { PROCESS_STEPS } from '@/data/content';
import { ScrollCarousel } from './ScrollCarousel';

const PROCESS_STEP_PAIRS = [
  PROCESS_STEPS.slice(0, 2),
  PROCESS_STEPS.slice(2, 4),
  PROCESS_STEPS.slice(4, 6),
] as const;

type ProcessStep = (typeof PROCESS_STEPS)[number];

export function ProcessStepCard({ step }: { step: ProcessStep }) {
  return (
    <div className="process-step">
      <div className="process-icon">{step.icon}</div>
      <strong>{step.title}</strong>
      <span>{step.desc}</span>
    </div>
  );
}

export function ProcessStepsCarousel() {
  return (
    <ScrollCarousel
      items={PROCESS_STEP_PAIRS}
      scrollableMq="(max-width: 767px)"
      classNames={{
        root: 'process-carousel protection-process',
        track: 'process-grid process-grid--carousel',
        navPrev: 'process-nav process-nav--prev',
        navNext: 'process-nav process-nav--next',
        slide: 'process-slide',
      }}
      renderSlide={pair => pair.map(step => <ProcessStepCard key={step.title} step={step} />)}
    />
  );
}
