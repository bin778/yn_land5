'use client';

import Link from 'next/link';
import { type FormEvent } from 'react';
import { MessageModal } from '@/components/common/MessageModal';
import { ASSET_OPTIONS, MATTER_OPTIONS, TRUST_ROWS } from '@/data/content';
import { renderTextSegments } from '@/lib/renderTextSegments';
import { PRIVACY_URL } from '@/lib/constants';
import { composeSituation, normalizeName } from '@/lib/form';
import { normalizePhone } from '@/lib/phone';
import { useConsultSubmit } from '@/lib/useConsultSubmit';

export function ConsultSection() {
  const { isSubmitting, statusMessage, isStatusModalOpen, closeStatusModal, handleFormInteraction, submit } =
    useConsultSubmit({
      formLabel: 'inheritance',
    });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = normalizeName(String(formData.get('name') ?? ''));
    const tel = normalizePhone(String(formData.get('phone') ?? ''));
    const situation = composeSituation({
      matter: String(formData.get('matter') ?? ''),
      death: String(formData.get('death') ?? ''),
      relation: String(formData.get('relation') ?? ''),
      asset: String(formData.get('asset') ?? ''),
      summary: String(formData.get('summary') ?? ''),
    });

    void submit(name, tel, {
      situation,
      onSuccess: () => {
        form.reset();
      },
    });
  }

  return (
    <section className="section consult-wrap" id="consult">
      <div className="wrap consult-box">
        <div>
          <h2>
            권리가 정리되면{` `}
            <br className="br-mobile" />
            해결은 선명해집니다
          </h2>
          <p className="lead">
            가족과 협의할 수 있는 사건인지, 조정이 필요한 사건인지, 법원의 판단이 필요한 사건인지,{` `}
            <br />
            시작하기 전에 현재 상황과{` `}
            <br className="br-mobile" />
            지켜야 할 권리부터{` `}
            <br className="br-desktop" />
            정리할 수 있습니다.
          </p>
          <div className="trust-list">
            {TRUST_ROWS.map(row => (
              <div key={row.title} className="trust-row">
                <span className="check">✓</span>
                <span>
                  <b>{row.title}</b>
                  <br />
                  {renderTextSegments(row.body)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <form
          className="form-panel"
          id="inheritanceForm"
          onFocusCapture={handleFormInteraction}
          onSubmit={handleSubmit}
        >
          <div className="form-grid">
            <div className="field">
              <label htmlFor="name">성함 *</label>
              <input id="name" name="name" required placeholder="성함" disabled={isSubmitting} />
            </div>
            <div className="field">
              <label htmlFor="phone">연락처 *</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                required
                placeholder="010-0000-0000"
                disabled={isSubmitting}
              />
            </div>
            <div className="field">
              <label htmlFor="matter">상담 분야 *</label>
              <select id="matter" name="matter" required defaultValue="" disabled={isSubmitting}>
                <option value="">선택해 주세요</option>
                {MATTER_OPTIONS.map(option => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="death">사망 시점</label>
              <input id="death" name="death" placeholder="예: 2026년 5월" disabled={isSubmitting} />
            </div>
            <div className="field">
              <label htmlFor="relation">피상속인과의 관계</label>
              <input id="relation" name="relation" placeholder="예: 아버지" disabled={isSubmitting} />
            </div>
            <div className="field">
              <label htmlFor="asset">예상 상속재산 규모</label>
              <select id="asset" name="asset" defaultValue="" disabled={isSubmitting}>
                <option value="">선택해 주세요</option>
                {ASSET_OPTIONS.map(option => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="field full">
              <label htmlFor="summary">간단한 상황 설명</label>
              <textarea
                id="summary"
                name="summary"
                placeholder="예: 형제가 생전에 아파트를 증여받았고 현재 상속재산분할 협의가 되지 않습니다."
                disabled={isSubmitting}
              />
            </div>
          </div>
          <label className="privacy">
            <input type="checkbox" defaultChecked disabled={isSubmitting} />
            <span>
              개인정보 수집 및 상담 연락에 동의합니다.{' '}
              <Link href={PRIVACY_URL} target="_blank" rel="noopener noreferrer">
                개인정보처리방침
              </Link>
              을 확인했습니다.
            </span>
          </label>
          <button className="btn btn-navy btn-lg" style={{ width: '100%' }} type="submit" disabled={isSubmitting}>
            {isSubmitting ? '접수 중...' : '상담 신청하기 →'}
          </button>
        </form>
      </div>

      <MessageModal message={statusMessage} isOpen={isStatusModalOpen} onClose={closeStatusModal} />
    </section>
  );
}
