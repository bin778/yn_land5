'use client';

import { TrackedCta } from '@/components/common/TrackedCta';
import { KAKAO_CHAT_URL, PHONE_TEL } from '@/lib/constants';

export function FinalCtaSection() {
  return (
    <section className="section-sm final">
      <div className="wrap final-grid">
        <div className="reveal">
          <div className="kicker">Contact Yeon</div>
          <h2>
            가족과 더 크게 다투기 전에,
            <br />
            지켜야 할 권리부터 확인하세요.
          </h2>
          <p className="lead">
            상속분쟁의 답이 반드시 소송일 필요는 없습니다. 그러나 합리적인 해결도 내 권리가 무엇인지 정확히 알고 있을 때
            가능합니다.
          </p>
        </div>
        <div className="final-actions reveal">
          <TrackedCta className="btn btn-ghost btn-lg" href={`tel:${PHONE_TEL}`} trackSource="final-phone">
            24시 전화 상담
          </TrackedCta>
          <TrackedCta
            className="btn btn-ghost btn-lg"
            href={KAKAO_CHAT_URL}
            target="_blank"
            rel="noopener noreferrer"
            trackSource="final-kakao"
            trackChannel="kakao"
          >
            카카오톡 상담
          </TrackedCta>
        </div>
      </div>
    </section>
  );
}
