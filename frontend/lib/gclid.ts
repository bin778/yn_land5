const GCLID_KEY = 'gclid';
const EXPIRY_MS = 90 * 24 * 60 * 60 * 1000;

function getParam(name: string): string | null {
  const match = RegExp(`[?&]${name}=([^&]*)`).exec(window.location.search);
  return match ? decodeURIComponent(match[1].replace(/\+/g, ' ')) : null;
}

export function captureGclid(): void {
  const gclid = getParam('gclid');
  const gclsrc = getParam('gclsrc');
  const validGclsrc = !gclsrc || gclsrc.includes('aw');
  if (gclid && validGclsrc) {
    localStorage.setItem(GCLID_KEY, JSON.stringify({ value: gclid, expiry: Date.now() + EXPIRY_MS }));
  }
}

export function getStoredGclid(): string {
  try {
    const raw = localStorage.getItem(GCLID_KEY);
    if (!raw) return '';
    const { value, expiry } = JSON.parse(raw) as { value: string; expiry: number };
    return expiry > Date.now() ? value : '';
  } catch {
    return '';
  }
}
