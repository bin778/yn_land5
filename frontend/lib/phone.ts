const PHONE_REGEX = /^010\d{8}$/;
const BLOCKED_PHONES = ['01000000000', '01011111111', '01012345678', '01099999999', '01012341234', '01000001234'];

export const MOBILE_PHONE_ERROR_MESSAGE = '전화번호를 제대로 입력해야 합니다.\n(예: 01012345678)';

export function normalizePhone(value: string): string {
  return value.replace(/[^0-9]/g, '');
}

export function isValidMobilePhone(phone: string): boolean {
  return PHONE_REGEX.test(phone) && !BLOCKED_PHONES.includes(phone);
}
