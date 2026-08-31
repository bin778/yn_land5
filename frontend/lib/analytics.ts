import { LP_SLUG } from './constants';
import { pushDataLayer } from './dataLayer';

const GADS_CONVERSION = process.env.NEXT_PUBLIC_GADS_CONVERSION ?? 'AW-11100462577/9UOXCIrr3owaEPG7jq0p';

function runWhenGtagReady(fn: () => void, maxAttempts = 30) {
  let attempts = 0;
  const attempt = () => {
    if (typeof window.gtag === 'function') {
      fn();
      return;
    }
    if (attempts++ < maxAttempts) {
      window.setTimeout(attempt, 100);
    }
  };

  attempt();
}

export { pushDataLayer, trackPageView } from './dataLayer';

/** GTM dataLayer + gtag 이중 전송 */
export function trackEvent(params: { category: string; action: string; label?: string }) {
  pushDataLayer({
    event: 'ga4_custom_event',
    event_category: params.category,
    event_action: params.action,
    ...(params.label ? { event_label: params.label } : {}),
  });

  runWhenGtagReady(() => {
    window.gtag!('event', params.action, {
      event_category: params.category,
      ...(params.label ? { event_label: params.label } : {}),
    });
  });
}

/** 상담 전환 — GA4 리드 + Ads 전환 (API success 시점) */
export function trackConsultSuccess(alertMessage: string) {
  const eventParams = {
    alert_message: alertMessage,
    landing_id: LP_SLUG,
    landing_topic: 'inheritance',
    result_type: 'success',
    page_path: window.location.pathname,
    page_location: window.location.href,
  };

  pushDataLayer({
    event: 'inheritance_lead_success',
    form_name: 'inheritance',
    ...eventParams,
  });

  runWhenGtagReady(() => {
    window.gtag!('event', 'inheritance_lead_success', eventParams);
  });

  trackGoogleAdsConversion(GADS_CONVERSION);
}

/** Google Ads 전환 */
export function trackGoogleAdsConversion(sendTo: string, value = 1.0, currency = 'KRW') {
  pushDataLayer({
    event: 'conversion',
    send_to: sendTo,
    value,
    currency,
  });

  runWhenGtagReady(() => {
    window.gtag!('event', 'conversion', {
      send_to: sendTo,
      value,
      currency,
    });
  });
}
