export function formatKoreanDate(dateStr: string) {
  if (!dateStr || dateStr.trim() === "") {
    return "비공개";
  }

  const [year, month, day] = dateStr.replace(/\.$/, "").split("-");
  return `${year}년 ${month}월 ${day}일`;
}
