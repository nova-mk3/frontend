import dayjs from "dayjs";

export const formatDate = (inputDate: string): string => {
  const date = new Date(inputDate); // 문자열을 Date 객체로 변환
  const today = new Date();

  const diffTime = today.getTime() - date.getTime(); // 현재 시간과 입력 시간의 차이 (밀리초)
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // 일 단위 차이

  if (diffDays === 0) return "오늘";
  if (diffDays === 1) return "1일 전";
  if (diffDays <= 7) return `${diffDays}일 전`;

  // 날짜 형식을 'YYYY-MM-DD'로 변환
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const toFormattedDate = (dateString: string): string => {
  const date = new Date(dateString);

  // KST 기준으로 변환 (UTC+9 적용)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export const parseStringToDate = (str: string): Date =>
  dayjs(str, "YYYY-MM-DD").toDate();

export const parseDatetoString = (date: Date): string =>
  dayjs(date).format("YYYY-MM-DD");
