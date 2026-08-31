# yn_land5 — 상속 스토리텔링 랜딩

Next.js (SSG) + Tailwind CSS + TypeScript

- slug·배포 URL: **미정** (`deploy.config.ts` placeholder)
- 상담 폼: UI + mock submit (API 연동은 slug 확정 후)

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

## 구조

```
frontend/
  app/                          layout, page, globals.css, inheritance.css
  components/lp/inheritance/    섹션 컴포넌트
  data/content.ts               카피·FAQ·변호사 데이터
  public/image/                 HTML에서 추출한 이미지
```
