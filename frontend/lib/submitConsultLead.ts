import { trackConsultSuccess, trackEvent } from '@/lib/analytics';
import { LP_SLUG } from '@/lib/constants';
import { getStoredGclid } from '@/lib/gclid';
import { getLandingInflowLabel } from '@/lib/inflow';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://www.yeoon.co.kr/criminal/api';

export type SubmitConsultLeadInput = {
  name: string;
  tel: string;
  /** 관리자 문의 내용 → DB c_content */
  content: string;
  /** 사건 키워드(상담 분야) → DB c_option */
  situation: string;
  executeRecaptcha: (action: string) => Promise<string>;
  formLabel: string;
};

export type SubmitConsultLeadResult =
  | { ok: true }
  | { ok: false; message: string };

export async function submitConsultLead({
  name,
  tel,
  content,
  situation,
  executeRecaptcha,
  formLabel,
}: SubmitConsultLeadInput): Promise<SubmitConsultLeadResult> {
  try {
    const recaptchaToken = await executeRecaptcha('submit_consult');

    const response = await fetch(`${API_BASE_URL}/submit_form.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        tel,
        page: LP_SLUG,
        content,
        situation,
        recaptcha_token: recaptchaToken,
        gclid: getStoredGclid(),
        inflow: getLandingInflowLabel(),
      }),
    });

    const data = (await response.json()) as { result?: string; msg?: string };

    if (data.result === 'success') {
      const successMessage = '상담 접수가 완료되었습니다.';
      trackConsultSuccess(successMessage);
      trackEvent({
        category: 'Conversion',
        action: 'lead_form_success',
        label: formLabel,
      });

      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Lead');
      }

      return { ok: true };
    }

    trackEvent({
      category: 'Conversion',
      action: 'lead_form_error',
      label: formLabel,
    });

    return { ok: false, message: data.msg || '오류가 발생했습니다.' };
  } catch (error) {
    console.error(error);
    trackEvent({
      category: 'Conversion',
      action: 'lead_form_error',
      label: formLabel,
    });

    return {
      ok: false,
      message: '접수 중 오류가 발생했습니다. 02-318-2981 또는 카카오톡 상담을 이용해 주세요.',
    };
  }
}
