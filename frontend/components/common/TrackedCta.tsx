'use client';

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { trackCallLead, type CallLeadChannel } from '@/lib/callTracking';
import { trackEvent } from '@/lib/analytics';

type TrackedCtaProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  trackSource: string;
  trackChannel?: CallLeadChannel;
  children: ReactNode;
};

export function TrackedCta({ trackSource, trackChannel = 'call', onClick, children, ...rest }: TrackedCtaProps) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    trackCallLead(trackSource, trackChannel);
    trackEvent({
      category: 'CTA',
      action: trackChannel === 'kakao' ? 'kakao_click' : 'phone_click',
      label: trackSource,
    });
    onClick?.(e);
  }

  return (
    <a {...rest} onClick={handleClick}>
      {children}
    </a>
  );
}
