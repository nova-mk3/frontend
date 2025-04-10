export const formatPhoneNumber = (phone: string) => {
  if (!phone) return ""; // 전화번호가 없을 경우 빈 문자열 반환

  return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"); // ✅ 3-4-4 패턴으로 변환
};

export const formatBirthday = (birthday: string) => {
  if (!birthday) return ""; // 생일이 없을 경우 빈 문자열 반환

  return birthday.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"); // ✅ 4-2-2 패턴으로 변환
};
