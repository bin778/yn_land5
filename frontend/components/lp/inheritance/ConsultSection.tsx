'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ASSET_OPTIONS, MATTER_OPTIONS, TRUST_ROWS } from '@/data/content';
import { PRIVACY_URL } from '@/lib/constants';

export function ConsultSection() {
  const [status, setStatus] = useState('');
  const [showStatus, setShowStatus] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'gbraid', 'wbraid'];
    keys.forEach(key => {
      document.querySelectorAll<HTMLInputElement>(`[name="${key}"]`).forEach(el => {
        el.value = params.get(key) ?? '';
      });
    });
  }, []);

  function handleFocusIn() {
    if (!started) setStarted(true);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = Object.fromEntries(new FormData(form));
    console.log('[inheritance-form mock]', data);

    setStatus('디자인 확인용 — 실제 접수 API는 slug 확정 후 연결됩니다.');
    setShowStatus(true);
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

        <form className="form-panel reveal" id="inheritanceForm" onFocusCapture={handleFocusIn} onSubmit={handleSubmit}>
          <input type="hidden" name="utm_source" />
          <input type="hidden" name="utm_medium" />
          <input type="hidden" name="utm_campaign" />
          <input type="hidden" name="utm_term" />
          <input type="hidden" name="utm_content" />
          <input type="hidden" name="gclid" />
          <input type="hidden" name="gbraid" />
          <input type="hidden" name="wbraid" />
          <div className="form-grid">
            <div className="field">
              <label htmlFor="name">성함 *</label>
              <input id="name" name="name" required placeholder="성함" />
            </div>
            <div className="field">
              <label htmlFor="phone">연락처 *</label>
              <input id="phone" name="phone" type="tel" inputMode="numeric" required placeholder="010-0000-0000" />
            </div>
            <div className="field">
              <label htmlFor="matter">상담 분야 *</label>
              <select id="matter" name="matter" required defaultValue="">
                <option value="">선택해 주세요</option>
                {MATTER_OPTIONS.map(option => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="death">사망 시점</label>
              <input id="death" name="death" placeholder="예: 2026년 5월" />
            </div>
            <div className="field">
              <label htmlFor="relation">피상속인과의 관계</label>
              <input id="relation" name="relation" placeholder="예: 아버지" />
            </div>
            <div className="field">
              <label htmlFor="asset">예상 상속재산 규모</label>
              <select id="asset" name="asset" defaultValue="">
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
              />
            </div>
          </div>
          <label className="privacy">
            <input type="checkbox" required />
            <span>
              개인정보 수집 및 상담 연락에 동의합니다.{' '}
              <Link href={PRIVACY_URL} target="_blank" rel="noopener noreferrer">
                개인정보처리방침
              </Link>
              을 확인했습니다.
            </span>
          </label>
          <button className="btn btn-navy btn-lg" style={{ width: '100%' }} type="submit">
            상담 신청하기 →
          </button>
          <div className={`form-status${showStatus ? ' show' : ''}`} id="formStatus">
            {status}
          </div>
        </form>
      </div>
    </section>
  );
}
