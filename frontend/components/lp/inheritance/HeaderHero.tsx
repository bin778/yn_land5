/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { TrackedCta } from '@/components/common/TrackedCta';
import { assetPath } from '@/lib/asset-path';
import { KAKAO_CHAT_URL, PHONE_DISPLAY, PHONE_TEL, YEOON_HOME_URL } from '@/lib/constants';

const NAV_LINKS = [
  { href: '#story', label: '상속 이야기' },
  { href: '#consult', label: '상담 안내' },
  { href: '#process', label: '해결 과정' },
  { href: '#lawyers', label: '변호사' },
  { href: '#faq', label: 'FAQ' },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header id="header" className={scrolled ? 'scrolled' : undefined}>
      <div className="wrap nav">
        <a href={YEOON_HOME_URL} aria-label="법무법인 여온 홈페이지">
          <img className="logo" src={assetPath('/image/logo.webp')} alt="법무법인 여온" />
        </a>
        <nav className="navlinks" aria-label="주요 섹션">
          {NAV_LINKS.map(link => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <TrackedCta href={`tel:${PHONE_TEL}`} className="phone-mini" trackSource="header-phone">
            {PHONE_DISPLAY}
          </TrackedCta>
          <TrackedCta href={`tel:${PHONE_TEL}`} className="btn btn-primary" trackSource="header-phone-cta">
            24시 전화 상담 →
          </TrackedCta>
        </div>
      </div>
    </header>
  );
}

export function HeroSection() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1>
            상속이 시작되면,
            <br />
            <span>
              지켜야 할 것이 <br /> 생깁니다
            </span>
          </h1>
          <p className="lead">
            같은 가족이어도 상속이 시작되는 순간 <br /> 재산을 바라보는 기준은 달라집니다.
          </p>
          <div className="hero-actions">
            <TrackedCta className="btn btn-ghost btn-lg" href={`tel:${PHONE_TEL}`} trackSource="hero-phone">
              24시 전화 상담
            </TrackedCta>
            <TrackedCta
              className="btn btn-ghost btn-lg"
              href={KAKAO_CHAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              trackSource="hero-kakao"
              trackChannel="kakao"
            >
              카카오톡 상담
            </TrackedCta>
          </div>
          <div className="hero-sub">
            <span>
              <i /> 변호사 직접 상담
            </span>
            <span>
              <i /> 상속재산분할·유류분·기여분
            </span>
            <span>
              <i /> 서울·부천 상담
            </span>
          </div>
        </div>
        <div className="hero-lawyer">
          <img src={assetPath('/image/lawyer-yoo.webp')} alt="법무법인 여온 유영규 대표변호사" />
          <div className="hero-card glass">
            <div className="role">법무법인 여온 대표변호사</div>
            <div className="name">유영규 변호사</div>
            <p>의뢰인의 권리를 먼저 확인하고, 그 권리를 바탕으로 가장 합리적인 해결 방법을 찾습니다.</p>
          </div>
        </div>
      </div>
      <div className="story-marker">SCROLL TO STORY</div>
    </section>
  );
}
