'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

type ConsultModalContextValue = {
  openConsultModal: () => void;
  closeConsultModal: () => void;
  scrollToConsultForm: () => void;
};

const ConsultModalContext = createContext<ConsultModalContextValue | null>(null);

export function ConsultModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openConsultModal = useCallback(() => {
    setIsOpen(true);
    document.body.classList.add('lock');
  }, []);

  const closeConsultModal = useCallback(() => {
    setIsOpen(false);
    document.body.classList.remove('lock');
  }, []);

  const scrollToConsultForm = useCallback(() => {
    closeConsultModal();
    document.getElementById('consult')?.scrollIntoView({ behavior: 'smooth' });
    window.setTimeout(() => {
      const nameInput = document.querySelector<HTMLInputElement>('#inheritanceForm input[name="name"]');
      nameInput?.focus();
    }, 500);
  }, [closeConsultModal]);

  useEffect(() => {
    return () => {
      document.body.classList.remove('lock');
    };
  }, []);

  return (
    <ConsultModalContext.Provider value={{ openConsultModal, closeConsultModal, scrollToConsultForm }}>
      {children}
      <div
        className={`modal${isOpen ? ' show' : ''}`}
        id="consultModal"
        aria-hidden={!isOpen}
        onClick={e => {
          if (e.target === e.currentTarget) closeConsultModal();
        }}
      >
        <div className="modal-card">
          <button type="button" className="modal-close" aria-label="닫기" onClick={closeConsultModal}>
            ×
          </button>
          <h2 style={{ fontSize: 34, marginBottom: 10 }}>상속 문제 상담</h2>
          <p style={{ color: 'var(--muted)', marginBottom: 22 }}>상담폼으로 이동해 현재 알고 있는 내용만 남겨주세요.</p>
          <button type="button" className="btn btn-navy btn-lg" style={{ width: '100%' }} onClick={scrollToConsultForm}>
            상담 정보 입력하기 →
          </button>
          <div style={{ height: 10 }} />
          <a className="btn btn-light btn-lg" style={{ width: '100%' }} href="tel:023182981">
            지금 전화하기
          </a>
        </div>
      </div>
    </ConsultModalContext.Provider>
  );
}

export function useConsultModal() {
  const ctx = useContext(ConsultModalContext);
  if (!ctx) {
    throw new Error('useConsultModal must be used within ConsultModalProvider');
  }
  return ctx;
}
