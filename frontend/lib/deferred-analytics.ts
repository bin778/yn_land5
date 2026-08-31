import { trackPageView } from './dataLayer';

/** GTM은 layout 표준 스니펫으로 즉시 로드됨. pageview만 dataLayer에 전송 */
export function queuePageView(pagePath: string) {
  trackPageView(pagePath);
}

/** @deprecated GTM은 layout에서 즉시 로드. 호출부 호환용 no-op */
export function activateDeferredAnalytics() {}
