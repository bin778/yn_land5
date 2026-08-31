# yn_land5 — 상속 스토리텔링 랜딩

Next.js (SSG) + Tailwind CSS + TypeScript

- slug·배포 URL: **미정** (`deploy.config.ts` placeholder)
- GTM / GCLID / reCAPTCHA: **프론트 적용 완료** (백엔드 slug·inflow 등록은 별도)

## 로컬 개발

```bash
cd frontend
npm install
npm run dev
```

→ `http://localhost:3000`

## 빌드

```bash
cd frontend
npm run build
```

산출물: `frontend/out/`

## 환경 변수

`frontend/.env.example` 참고. 로컬은 `.env.local`에 설정.

```
NEXT_PUBLIC_API_URL=https://www.yeoon.co.kr/criminal/api
# NEXT_PUBLIC_GTM_ID=GTM-W24G2LD8
# NEXT_PUBLIC_RECAPTCHA_SITE_KEY=...
# NEXT_PUBLIC_GADS_CONVERSION=AW-11100462577/9UOXCIrr3owaEPG7jq0p
```

```
frontend/
  app/                          layout, page, globals.css, inheritance.css
  components/lp/inheritance/    섹션 컴포넌트
  data/content.ts               카피·FAQ·변호사 데이터
  public/image/                 HTML에서 추출한 이미지
```
