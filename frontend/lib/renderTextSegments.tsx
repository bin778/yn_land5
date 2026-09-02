import { type ReactNode } from 'react';

export type LineBreak = 'br' | 'br-mobile' | 'br-desktop';
export type TextSegment = string | LineBreak;
export type TextContent = string | readonly TextSegment[];

function isLineBreak(part: TextSegment): part is LineBreak {
  return part === 'br' || part === 'br-mobile' || part === 'br-desktop';
}

export function renderTextSegments(content: TextContent): ReactNode {
  if (typeof content === 'string') {
    return content;
  }

  return content.map((part, index) =>
    isLineBreak(part) ? <br key={index} className={part === 'br' ? undefined : part} /> : part,
  );
}
