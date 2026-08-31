import { DEPLOY_BASE } from '@/deploy.config';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (process.env.NODE_ENV === 'production' ? DEPLOY_BASE : '');

export function assetPath(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) {
    return path;
  }

  return `${basePath}${path}`;
}
