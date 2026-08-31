const NAME_REGEX = /^(?!.*(.)\1{3,})[가-힣a-zA-Z ]{2,15}$/;
const BLOCKED_NAMES = [
  'test',
  'asdf',
  'qwerty',
  'admin',
  'user',
  'null',
  'undefined',
  'aaa',
  '테스트',
  '가나다',
  'ㅋㅋ',
  'abc',
];

export function normalizeName(value: string): string {
  return value
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[^가-힣a-zA-Z ]/g, '')
    .slice(0, 15);
}

export function isValidName(name: string): boolean {
  if (!NAME_REGEX.test(name)) return false;
  return name.replace(/ /g, '').length >= 2;
}

export function isBlockedName(name: string): boolean {
  return BLOCKED_NAMES.includes(name.toLowerCase());
}

export function composeSituation(fields: {
  matter?: string;
  death?: string;
  relation?: string;
  asset?: string;
  summary?: string;
}): string {
  return [
    fields.matter && `상담분야: ${fields.matter}`,
    fields.death && `사망시점: ${fields.death}`,
    fields.relation && `관계: ${fields.relation}`,
    fields.asset && `재산규모: ${fields.asset}`,
    fields.summary && `상황: ${fields.summary}`,
  ]
    .filter(Boolean)
    .join(' · ');
}
