/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, type KeyboardEvent } from 'react';
import { assetPath } from '@/lib/asset-path';
import { renderTextSegments, type TextContent } from '@/lib/renderTextSegments';

type Lawyer = {
  image: string;
  name: string;
  bio: TextContent;
  career: readonly string[];
};

type LawyerCardProps = {
  lawyer: Lawyer;
};

export function LawyerCard({ lawyer }: LawyerCardProps) {
  const [open, setOpen] = useState(false);

  function toggleOpen() {
    setOpen(prev => !prev);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleOpen();
    }
  }

  return (
    <article
      className={`lawyer-card${open ? ' is-open' : ''}`}
      onClick={toggleOpen}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-expanded={open}
      aria-label={`${lawyer.name} 이력 ${open ? '닫기' : '보기'}`}
    >
      <div className="lawyer-photo">
        <img src={assetPath(lawyer.image)} alt={lawyer.name} />
        <div className="lawyer-career" aria-hidden={!open}>
          <ul>
            {lawyer.career.map(line => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="lawyer-info">
        <div className="lawyer-name">{lawyer.name}</div>
        <p>{renderTextSegments(lawyer.bio)}</p>
      </div>
    </article>
  );
}
