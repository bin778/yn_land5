declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function pushDataLayer(payload: Record<string, unknown>) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

/** GTM에서 virtual_page_view 등으로 매핑 */
export function trackPageView(pagePath: string) {
  pushDataLayer({
    event: 'virtual_page_view',
    page_path: pagePath,
    page_location: window.location.href,
  });
}
