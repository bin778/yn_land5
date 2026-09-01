'use client';

import { useState } from 'react';
import { FAQ_ITEMS } from '@/data/content';

export function FaqSection() {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());

  function toggle(index: number) {
    setOpenIndexes(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <section className="section" id="faq">
      <div className="wrap">
        <div className="center">
          <div className="kicker">FAQ</div>
          <h2>
            상담 전에 가장 많이
            <br className="br-mobile" />
            묻는 질문들
          </h2>
        </div>
        <div className="faq-list">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndexes.has(index);
            return (
              <div key={item.q} className={`faq-item${isOpen ? ' open' : ''}`}>
                <button type="button" className="faq-q" aria-expanded={isOpen} onClick={() => toggle(index)}>
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
