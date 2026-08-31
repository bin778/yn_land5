/** GTM 컨테이너 ID (env 미설정 시 기본값) */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? 'GTM-W24G2LD8';

/** Google 태그 관리자 head 스니펫 (설치 검사용 표준 코드) */
export const GTM_HEAD_SNIPPET = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;
