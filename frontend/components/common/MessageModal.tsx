'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

type MessageModalProps = {
  message: string;
  isOpen: boolean;
  onClose: () => void;
};

export function MessageModal({ message, isOpen, onClose }: MessageModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    document.body.classList.add('lock');
    return () => {
      document.body.classList.remove('lock');
    };
  }, [isOpen]);

  if (!isOpen || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="modal message-modal show"
      role="presentation"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal-card message-modal-card"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="message-modal-body"
      >
        <button type="button" className="modal-close" aria-label="닫기" onClick={onClose}>
          ×
        </button>
        <p id="message-modal-body" className="message-modal-body">
          {message}
        </p>
        <button type="button" className="btn btn-lg message-modal-confirm" onClick={onClose}>
          확인
        </button>
      </div>
    </div>,
    document.body,
  );
}
