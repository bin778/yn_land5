# yn_land5 — 상속 스토리텔링 랜딩

Next.js (SSG) + Tailwind CSS + TypeScript

**공개 URL:** https://www.yeoon.co.kr/familylawcase/inheritance/

형사(criminal) 랜딩과 동일하게 **공유 PHP API** + **랜딩별 정적 프론트** 구조입니다.

| 구분           | URL                                                  | FTP 경로                                       |
| -------------- | ---------------------------------------------------- | ---------------------------------------------- |
| 이 랜딩 프론트 | `https://www.yeoon.co.kr/familylawcase/inheritance/` | `/lawfirmonly1/www/familylawcase/inheritance/` |
| 공유 API       | `https://www.yeoon.co.kr/criminal/api`               | `/lawfirmonly1/www/criminal/api/`              |

**Next.js rewrite:** `yn_main/frontend/next.config.ts` (`FAMILY_LAWCASE_LANDING_SLUGS`)  
**경로 설정:** `frontend/deploy.config.ts`  
**백엔드 slug:** `inheritance` (`yn_drunk/backend/api/` — `submit_form.php`, `call_lead.php`, `form_validation.php`)

---

## 로컬 개발

```bash
cd frontend
npm install
npm run dev
```

→ `http://localhost:3000` (로컬은 `basePath` 없음)

API를 로컬에서 쓰려면 `frontend/.env.local`:

```
NEXT_PUBLIC_API_URL=https://www.yeoon.co.kr/criminal/api
```

---

## 빌드·배포

```bash
cd frontend
npm run build
```

- production 빌드는 `deploy.config.ts`의 `DEPLOY_BASE`와 `.env.production`을 사용합니다.
- 산출물: `frontend/out/` (약 1.3MB — 폰트는 CDN)
- SFTP: **`out/` 안의 파일·폴더만** `/familylawcase/inheritance/`에 업로드 (`index.html`, `_next/`, `image/`, `.htaccess` 등)
- `api/`, `config/`는 이 폴더 아래에 두지 않음 (criminal 루트 공유)

### 배포 전 체크

1. `yn_main` rewrite 배포 (`/familylawcase/inheritance/` → 카페24)
2. 서버 `/criminal/api/`에 `inheritance` slug·inflow 반영본 업로드
3. 상담 폼·전화 CTA 동작 확인

---

## 환경 변수

`frontend/.env.example` 참고. production은 `.env.production`, 로컬은 `.env.local`.

```
NEXT_PUBLIC_API_URL=https://www.yeoon.co.kr/criminal/api
NEXT_PUBLIC_SITE_URL=https://www.yeoon.co.kr/familylawcase/inheritance/

# 미설정 시 코드 기본값 사용
# NEXT_PUBLIC_GTM_ID=GTM-W24G2LD8
# NEXT_PUBLIC_GADS_CONVERSION=AW-11100462577/9UOXCIrr3owaEPG7jq0p
# NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LcuaXksAAAAAOSrpx8wAyoehcx6cqkV5n98Xw9Y
```

---

## 분석·보안

| 기능         | 구현                                                                |
| ------------ | ------------------------------------------------------------------- |
| GTM          | `layout.tsx` 표준 스니펫                                            |
| GA4 pageview | `AnalyticsBootstrap`                                                |
| GCLID        | URL 캡처 → localStorage(90일) → `submit_form.php` / `call_lead.php` |
| reCAPTCHA v3 | `LazyReCaptchaProvider` (폼 상호작용 시 lazy 로드)                  |
| Ads 전환     | `inheritance_lead_success` + `NEXT_PUBLIC_GADS_CONVERSION`          |

### GCLID 빠른 테스트

```
https://www.yeoon.co.kr/familylawcase/inheritance/?gclid=TEST_inheritance_YYYYMMDD
```

1. DevTools → Application → localStorage `gclid` 확인
2. 상담 제출 → Network `submit_form.php` payload에 `gclid`, `page: "inheritance"` 확인
3. 전화 CTA → `call_lead.php` (gclid 있을 때만 호출)
4. DB `user_inquiry`: `c_inflowurl=inheritance`, `utm_campaign=상속`

오프라인 전환 CSV·cron은 `yn_drunk` README §3 참고.

---

## 글꼴 (CDN)

| 용도           | 글꼴                  | 로드             |
| -------------- | --------------------- | ---------------- |
| 본문           | Pretendard            | jsDelivr CDN     |
| 제목(h1/h2 등) | Noto Serif KR 500/700 | Google Fonts CDN |

`next/font` self-host 미사용 — `out` 용량 절감.

---

## 디렉터리

```
frontend/
  app/                          layout, page, globals.css, inheritance/*.css
  components/lp/inheritance/    섹션 컴포넌트
  components/common/            TrackedCta, LazyReCaptchaProvider, …
  data/content.ts               카피·FAQ·변호사 데이터
  lib/                          analytics, gclid, submitConsultLead, …
  public/image/                 랜딩 이미지
  public/.htaccess              Apache SPA fallback
  deploy.config.ts              basePath·공개 URL·API URL
```
