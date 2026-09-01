'use client';

import { useEffect } from 'react';

function isInViewport(el: Element) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

/** HTML 프로토타입 .reveal IntersectionObserver 이식 */
export function RevealInit() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const reveal = (el: Element) => {
      el.classList.add('show');
    };

    if (reduce || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(reveal);
      return;
    }

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    const observeReveal = (el: Element) => {
      if (el.classList.contains('show')) return;

      if (isInViewport(el)) {
        reveal(el);
        return;
      }

      io.observe(el);
    };

    document.querySelectorAll('.reveal').forEach(observeReveal);

    const mo = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (!(node instanceof Element)) return;

          if (node.classList.contains('reveal')) {
            observeReveal(node);
          }
          node.querySelectorAll('.reveal').forEach(observeReveal);
        });
      });
    });

    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
