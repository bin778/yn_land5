'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useLazyReCaptcha } from '@/components/common/lazyReCaptchaContext';
import { ASSET_OPTIONS, MATTER_OPTIONS, TRUST_ROWS } from '@/data/content';
import { trackConsultSuccess, trackEvent } from '@/lib/analytics';
import { PRIVACY_URL, LP_SLUG } from '@/lib/constants';
import { composeSituation, isBlockedName, isValidName, normalizeName } from '@/lib/form';
import { getStoredGclid } from '@/lib/gclid';
import { getLandingInflowLabel } from '@/lib/inflow';
import { isValidMobilePhone, MOBILE_PHONE_ERROR_MESSAGE, normalizePhone } from '@/lib/phone';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://www.yeoon.co.kr/criminal/api';

export function ConsultSection() {
  const { activate, executeRecaptcha } = useLazyReCaptcha();
  const [status, setStatus] = useState('');
  const [showStatus, setShowStatus] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasTrackedFormStartRef = useRef(false);
  const executeRef = useRef(executeRecaptcha);

  useEffect(() => {
    executeRef.current = executeRecaptcha;
  }, [executeRecaptcha]);

  function handleFormInteraction() {
    activate();

    if (!hasTrackedFormStartRef.current) {
      hasTrackedFormStartRef.current = true;
      trackEvent({
        category: 'Engagement',
        action: 'lead_form_start',
        label: 'inheritance',
      });
    }
  }

  async function waitForExecuteRecaptcha(maxAttempts = 40) {
    activate();
    for (let i = 0; i < maxAttempts; i++) {
      if (executeRef.current) return executeRef.current;
      await new Promise(r => setTimeout(r, 100));
    }
    return undefined;
  }

  async function submitConsult(formData: FormData) {
    const execute = await waitForExecuteRecaptcha();

    if (!execute) {
      alert('보안 모듈이 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    const name = normalizeName(String(formData.get('name') ?? ''));
    const tel = normalizePhone(String(formData.get('phone') ?? ''));
    const situation = composeSituation({
      matter: String(formData.get('matter') ?? ''),
      death: String(formData.get('death') ?? ''),
      relation: String(formData.get('relation') ?? ''),
      asset: String(formData.get('asset') ?? ''),
      summary: String(formData.get('summary') ?? ''),
    });

    setIsSubmitting(true);
    setShowStatus(false);

    try {
      const recaptchaToken = await execute('submit_consult');

      const response = await fetch(`${API_BASE_URL}/submit_form.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          tel,
          page: LP_SLUG,
          situation,
          recaptcha_token: recaptchaToken,
          gclid: getStoredGclid(),
          inflow: getLandingInflowLabel(),
        }),
      });

      const data = (await response.json()) as { result?: string; msg?: string };

      if (data.result === 'success') {
        const successMessage = '상담 접수가 완료되었습니다.';
        trackConsultSuccess(successMessage);
        trackEvent({
          category: 'Conversion',
          action: 'lead_form_success',
          label: 'inheritance',
        });

        if (typeof window.fbq === 'function') {
          window.fbq('track', 'Lead');
        }

        alert(`${successMessage}\n담당 변호사가 확인 후 곧 연락드리겠습니다.`);
        const form = document.getElementById('inheritanceForm') as HTMLFormElement | null;
        form?.reset();
        setStatus('');
        setShowStatus(false);
        hasTrackedFormStartRef.current = false;
      } else {
        setStatus(data.msg || '오류가 발생했습니다.');
        setShowStatus(true);
        trackEvent({
          category: 'Conversion',
          action: 'lead_form_error',
          label: 'inheritance',
        });
      }
    } catch (error) {
      console.error(error);
      setStatus('접수 중 오류가 발생했습니다. 02-318-2981 또는 카카오톡 상담을 이용해 주세요.');
      setShowStatus(true);
      trackEvent({
        category: 'Conversion',
        action: 'lead_form_error',
        label: 'inheritance',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = normalizeName(String(formData.get('name') ?? ''));
    const tel = normalizePhone(String(formData.get('phone') ?? ''));

    if (!isValidName(name)) {
      alert('성함은 한글·영문 2~15자로 입력해주세요.');
      trackEvent({ category: 'Conversion', action: 'lead_form_validation_error', label: 'inheritance' });
      return;
    }

    if (isBlockedName(name)) {
      alert('올바른 성함을 입력해주세요.');
      trackEvent({ category: 'Conversion', action: 'lead_form_validation_error', label: 'inheritance' });
      return;
    }

    if (!isValidMobilePhone(tel)) {
      alert(MOBILE_PHONE_ERROR_MESSAGE);
      trackEvent({ category: 'Conversion', action: 'lead_form_validation_error', label: 'inheritance' });
      return;
    }

    trackEvent({
      category: 'Conversion',
      action: 'lead_form_submit',
      label: 'inheritance',
    });

    void submitConsult(formData);
  }

  return (
    <section className="section consult-wrap" id="consult">
      <div className="wrap consult-box">
        <div className="reveal">
          <div className="kicker">Your Situation</div>
          <h2>
            이제,
            <br />
            내 상황부터
            <br />
            정리해보세요.
          </h2>
          <p className="lead">
            법률용어를 몰라도 괜찮습니다. 현재 알고 있는 사실만 남겨주시면 상담에서 무엇부터 확인해야 하는지 정리할 수
            있습니다.
          </p>
          <div className="trust-list">
            {TRUST_ROWS.map(row => (
              <div key={row.title} className="trust-row">
                <span className="check">✓</span>
                <span>
                  <b>{row.title}</b>
                  <br />
                  {row.body}
                </span>
              </div>
            ))}
          </div>
        </div>

        <form
          className="form-panel reveal"
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
            <input type="checkbox" required disabled={isSubmitting} />
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
          <div className={`form-status${showStatus ? ' show' : ''}`} id="formStatus">
            {status}
          </div>
        </form>
      </div>
    </section>
  );
}
