/** user_inquiry.c_inflow — 플로팅·전화·카톡·상담폼 등 */
export const LANDING_INFLOW = {
  desktop: '상속 랜딩(PC)',
  mobile: '상속 랜딩(Mobile)',
} as const;

function isDesktopViewport(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(min-width: 768px)').matches;
}

export function getLandingInflowLabel(): string {
  return isDesktopViewport() ? LANDING_INFLOW.desktop : LANDING_INFLOW.mobile;
}
