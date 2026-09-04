'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useLazyReCaptcha } from '@/components/common/lazyReCaptchaContext';
import { trackEvent } from '@/lib/analytics';
import { isBlockedName, isValidName, normalizeName } from '@/lib/form';
import { isValidMobilePhone, MOBILE_PHONE_ERROR_MESSAGE, normalizePhone } from '@/lib/phone';
import { submitConsultLead } from '@/lib/submitConsultLead';

type UseConsultSubmitOptions = {
  formLabel: string;
};

export function useConsultSubmit({ formLabel }: UseConsultSubmitOptions) {
  const { activate, executeRecaptcha } = useLazyReCaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const hasTrackedFormStartRef = useRef(false);
  const executeRef = useRef(executeRecaptcha);

  useEffect(() => {
    executeRef.current = executeRecaptcha;
  }, [executeRecaptcha]);

  const closeStatusModal = useCallback(() => {
    setIsStatusModalOpen(false);
    setStatusMessage('');
  }, []);

  function handleFormInteraction() {
    activate();

    if (!hasTrackedFormStartRef.current) {
      hasTrackedFormStartRef.current = true;
      trackEvent({
        category: 'Engagement',
        action: 'lead_form_start',
        label: formLabel,
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

  async function submit(
    nameRaw: string,
    phoneRaw: string,
    options?: { content?: string; situation?: string; onSuccess?: () => void },
  ) {
    const name = normalizeName(nameRaw);
    const tel = normalizePhone(phoneRaw);

    if (!isValidName(name)) {
      alert('성함은 한글·영문 2~15자로 입력해주세요.');
      trackEvent({ category: 'Conversion', action: 'lead_form_validation_error', label: formLabel });
      return;
    }

    if (isBlockedName(name)) {
      alert('올바른 성함을 입력해주세요.');
      trackEvent({ category: 'Conversion', action: 'lead_form_validation_error', label: formLabel });
      return;
    }

    if (!isValidMobilePhone(tel)) {
      alert(MOBILE_PHONE_ERROR_MESSAGE);
      trackEvent({ category: 'Conversion', action: 'lead_form_validation_error', label: formLabel });
      return;
    }

    trackEvent({
      category: 'Conversion',
      action: 'lead_form_submit',
      label: formLabel,
    });

    const execute = await waitForExecuteRecaptcha();
    if (!execute) {
      alert('보안 모듈이 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    setIsSubmitting(true);
    closeStatusModal();

    const result = await submitConsultLead({
      name,
      tel,
      content: options?.content ?? '',
      situation: options?.situation ?? '',
      executeRecaptcha: execute,
      formLabel,
    });

    if (result.ok) {
      alert('상담 접수가 완료되었습니다.\n담당 변호사가 확인 후 곧 연락드리겠습니다.');
      options?.onSuccess?.();
      closeStatusModal();
      hasTrackedFormStartRef.current = false;
    } else {
      setStatusMessage(result.message);
      setIsStatusModalOpen(true);
    }

    setIsSubmitting(false);
  }

  return {
    isSubmitting,
    statusMessage,
    isStatusModalOpen,
    closeStatusModal,
    handleFormInteraction,
    submit,
  };
}
