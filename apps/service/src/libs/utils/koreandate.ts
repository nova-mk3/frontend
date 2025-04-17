export function formatKoreanDate(dateStr: string) {
  const [year, month, day] = dateStr.replace(/\.$/, "").split("-");
  return `${year}년 ${month}월 ${day}일`;
}
