'use client';

import { useState } from 'react';
import { FAQ_ITEMS } from '@/data/content';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section" id="faq">
      <div className="wrap">
        <div className="center reveal">
          <div className="kicker">FAQ</div>
          <h2>
            상담 전에 가장 많이
            <br />
            묻는 질문들
          </h2>
        </div>
        <div className="faq-list">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.q} className={`faq-item${isOpen ? ' open' : ''}`}>
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="q">
                    <span className="qmark">Q</span>
                    {item.q}
                  </span>
                  <span className="plus">＋</span>
                </button>
                <div className="faq-a">
                  <div className="faq-inner">{item.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
