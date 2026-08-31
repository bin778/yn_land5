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
            <br />내 권리부터 정리하세요.
          </h2>
          <p className="lead">무엇을 요구할지 결정하기 전에, 무엇을 확인해야 하는지부터 시작할 수 있습니다.</p>
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
