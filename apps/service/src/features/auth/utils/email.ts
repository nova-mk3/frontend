export const EmailList = [
  { id: 1, domain: "naver.com" }, // 국내 최대 사용자 수
  { id: 2, domain: "gmail.com" }, // 전 세계 1위 이메일 서비스
  { id: 3, domain: "chungbuk.ac.kr" }, // 충북대 도메인 (요청 반영)
  { id: 4, domain: "daum.net" }, // 국내 포털 2위
  { id: 5, domain: "hanmail.net" }, // daum 이전 도메인
  { id: 6, domain: "nate.com" }, // SK 계열 포털 이메일
  { id: 7, domain: "icloud.com" }, // Apple 계정용 이메일
  { id: 8, domain: "outlook.com" }, // Microsoft 이메일 서비스
  { id: 9, domain: "kakao.com" }, // 카카오 계정 기반 서비스
  { id: 10, domain: "yahoo.com" }, // 글로벌 사용자 다수 보유
];

export const isEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export function isNonEmptyArray<T>(arr: T[]): arr is [T, ...T[]] {
  return arr.length > 0;
}
