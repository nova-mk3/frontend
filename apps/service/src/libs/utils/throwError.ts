import { ERROR_MESSAGES } from "@/src/constant/error";

export const throwErrorMessage = (error: any) => {
  console.log(error);

  if (error.response) {
    // 서버가 응답한 경우 (HTTP 상태 코드 존재)
    const status = error.response.status;
    const message =
      error.response.data?.message ||
      ERROR_MESSAGES[status] ||
      ERROR_MESSAGES.SERVER_ERROR;
    throw new Error(message);
  } else if (error.request) {
    console.log(error.request);
    // 네트워크 오류 (서버 응답 없음)
    throw new Error(ERROR_MESSAGES.NO_RESPONSE);
  } else {
    // 기타 오류 (예: 코드 문제)
    throw new Error(error.message || ERROR_MESSAGES.GENERAL_ERROR);
  }
};
