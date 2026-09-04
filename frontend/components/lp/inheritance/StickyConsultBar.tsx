'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { MessageModal } from '@/components/common/MessageModal';
import { TrackedCta } from '@/components/common/TrackedCta';
import { KAKAO_CHAT_URL, PHONE_TEL, PRIVACY_URL } from '@/lib/constants';
import { useConsultSubmit } from '@/lib/useConsultSubmit';

export function StickyConsultBar() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [agree, setAgree] = useState(true);
  const { isSubmitting, statusMessage, isStatusModalOpen, closeStatusModal, handleFormInteraction, submit } =
    useConsultSubmit({
      formLabel: 'inheritance-sticky',
    });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    void submit(name, phone, {
      content: '하단 고정폼 문의',
      situation: '하단 고정폼 문의',
      onSuccess: () => {
        setName('');
        setPhone('');
        setAgree(true);
      },
    });
  }

  return (
    <section className="sticky-consult" aria-label="빠른 상담 신청">
      <div className="sticky-consult-inner">
        <div className="sticky-consult-quick">
          <TrackedCta href={`tel:${PHONE_TEL}`} className="sticky-quick-btn" trackSource="sticky-phone">
            24시 전화 상담
          </TrackedCta>
          <TrackedCta
            href={KAKAO_CHAT_URL}
            className="sticky-quick-btn"
            target="_blank"
            rel="noopener noreferrer"
            trackSource="sticky-kakao"
            trackChannel="kakao"
          >
            카카오톡 상담
          </TrackedCta>
        </div>

        <form className="sticky-consult-form" onSubmit={handleSubmit}>
          <div className="sticky-consult-row">
            <div className="sticky-consult-inputs">
              <input
                type="text"
                name="name"
                placeholder="성함"
                value={name}
                onFocus={handleFormInteraction}
                onChange={e => setName(e.target.value)}
                disabled={isSubmitting}
                autoComplete="name"
              />
              <input
                type="tel"
                name="phone"
                inputMode="numeric"
                placeholder="전화번호 (- 제외)"
                value={phone}
                onFocus={handleFormInteraction}
                onChange={e => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                maxLength={11}
                disabled={isSubmitting}
                autoComplete="tel"
              />
            </div>
            <button type="submit" className="sticky-consult-submit" disabled={isSubmitting}>
              {isSubmitting ? '접수 중...' : '상담 신청'}
            </button>
          </div>

          <div className="sticky-consult-meta">
            <label className="sticky-consult-privacy">
              <input
                type="checkbox"
                checked={agree}
                onChange={e => setAgree(e.target.checked)}
                disabled={isSubmitting}
              />
              <span>
                <Link href={PRIVACY_URL} target="_blank" rel="noopener noreferrer">
                  개인정보취급방침
                </Link>{' '}
                동의
              </span>
            </label>
          </div>
        </form>
      </div>

      <MessageModal message={statusMessage} isOpen={isStatusModalOpen} onClose={closeStatusModal} />
    </section>
  );
}
