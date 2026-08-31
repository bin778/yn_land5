import { LP_SLUG } from './constants';
import { getStoredGclid } from './gclid';
import { getLandingInflowLabel } from './inflow';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://www.yeoon.co.kr/criminal/api';

export type CallLeadChannel = 'call' | 'kakao';

/**
 * 전화·카톡 CTA 클릭 시 gclid를 백엔드에 남김.
 * tel:/외부 이동과 동시에 나가므로 sendBeacon / keepalive fetch 사용.
 * gclid 없으면 호출하지 않음 (오프라인 전환에 쓸 수 없음).
 */
export function trackCallLead(source = 'Call_Now', channel: CallLeadChannel = 'call', inflow?: string): void {
  const gclid = getStoredGclid();
  if (!gclid) return;

  const payload = JSON.stringify({
    gclid,
    page: LP_SLUG,
    source,
    channel,
    inflow: inflow ?? getLandingInflowLabel(),
  });

  const url = `${API_BASE_URL}/call_lead.php`;

  try {
    if (typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([payload], { type: 'application/json' });
      if (navigator.sendBeacon(url, blob)) {
        return;
      }
    }

    void fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    });
  } catch {
    // CTA 이동을 막지 않음
  }
}
