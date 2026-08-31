/* eslint-disable @next/next/no-img-element */
import { assetPath } from '@/lib/asset-path';

export function SiteFooter() {
  return (
    <footer>
      <div className="wrap footer-grid">
        <div>
          <img className="footer-logo" src={assetPath('/image/logo.webp')} alt="법무법인 여온" />
          <p>
            <b>대표자</b> 유영규 · <b>광고책임변호사</b> 유영규
          </p>
          <p>서울특별시 중구 남대문로10길 28, 10층 1003호 · 02-318-2981</p>
          <p>경기도 부천시 부천로 26, 3층 302호 · 032-666-2981</p>
          <div className="disclaimer">
            본 페이지는 일반적인 법률 정보를 제공하기 위한 것으로 개별 사건의 결과를 보장하지 않습니다. 실제 게시 전
            여온 내부 확인과 최신 변호사 광고 관련 규정 검수를 거쳐 사례·후기·전문분야 표현을 최종 확정하세요.
          </div>
        </div>
        <div>
          <p>
            <b>법무법인 여온</b>
          </p>
          <p>상속재산분할 · 유류분 · 기여분 · 상속포기·한정승인</p>
          <p style={{ marginTop: 14 }}>© LAW FIRM YEON. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
