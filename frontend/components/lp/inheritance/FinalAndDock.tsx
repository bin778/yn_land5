'use client';

import { KAKAO_CHAT_URL, PHONE_DISPLAY, PHONE_TEL } from '@/lib/constants';
import { useConsultModal } from '@/lib/consult-modal-context';

export function FinalCtaSection() {
  const { openConsultModal } = useConsultModal();

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
          <button type="button" className="btn btn-primary btn-lg open-consult" onClick={openConsultModal}>
            상속 상담하기 →
          </button>
          <a className="btn btn-ghost btn-lg" href={`tel:${PHONE_TEL}`}>
            {PHONE_DISPLAY}
          </a>
          <a className="btn btn-ghost btn-lg" href={KAKAO_CHAT_URL} target="_blank" rel="noopener noreferrer">
            카카오 상담
          </a>
        </div>
      </div>
    </section>
  );
}

export function MobileDock() {
  const { openConsultModal } = useConsultModal();

  return (
    <div className="mobile-dock">
      <a className="dock" href={`tel:${PHONE_TEL}`}>
        ☎
        <br />
        전화
      </a>
      <a className="dock" href={KAKAO_CHAT_URL} target="_blank" rel="noopener noreferrer">
        K
        <br />
        카카오
      </a>
      <button type="button" className="dock primary open-consult" onClick={openConsultModal}>
        상속 상담하기
      </button>
    </div>
  );
}
