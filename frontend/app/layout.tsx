import type { Metadata } from 'next';
import { Noto_Serif_KR } from 'next/font/google';
import { AnalyticsBootstrap } from '@/components/analytics/AnalyticsBootstrap';
import { ConsultModalProvider } from '@/lib/consult-modal-context';
import { assetPath } from '@/lib/asset-path';
import { GTM_HEAD_SNIPPET, GTM_ID } from '@/lib/gtm';
import { DEPLOY_URL } from '../deploy.config';
import './globals.css';

const notoSerif = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-noto-serif-kr',
  display: 'swap',
});

const TITLE = '상속재산분할·유류분·기여분 상담 | 법무법인 여온';
const DESCRIPTION =
  '상속은 재산만의 문제가 아닙니다. 생전 증여, 기여분, 유류분, 상속재산분할과 상속포기·한정승인까지. 법무법인 여온이 현재 상황부터 차분히 정리합니다.';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? DEPLOY_URL),
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: DEPLOY_URL,
    type: 'website',
    locale: 'ko_KR',
  },
  icons: {
    icon: assetPath('/favicon.png'),
    apple: assetPath('/favicon.png'),
  },
  other: {
    'theme-color': '#061c3c',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={notoSerif.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: GTM_HEAD_SNIPPET }} />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>
        <AnalyticsBootstrap />
        <ConsultModalProvider>{children}</ConsultModalProvider>
      </body>
    </html>
  );
}
