'use client';

import { useEffect } from 'react';
import { queuePageView } from '@/lib/deferred-analytics';
import { captureGclid } from '@/lib/gclid';

/** GCLID 캡처 + 초기 pageview (GTM은 layout 표준 스니펫으로 로드) */
export function AnalyticsBootstrap() {
  useEffect(() => {
    captureGclid();
    queuePageView(window.location.pathname + window.location.search);
  }, []);

  return null;
}
