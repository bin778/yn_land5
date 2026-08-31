import type { NextConfig } from 'next';
import { DEPLOY_BASE } from './deploy.config';

const basePath =
  process.env.NEXT_BASE_PATH ??
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.NODE_ENV === 'production' ? DEPLOY_BASE : '');

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
