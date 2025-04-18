import axios from 'axios';

export const throwError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message =
            error.response?.data?.message ||
            (status ? ERROR_MESSAGES[status] : null) ||
            ERROR_MESSAGES.SERVER_ERROR;

        throw new Error(message);
    } else if (error instanceof Error) {
        throw new Error(error.message || ERROR_MESSAGES.GENERAL_ERROR);
    } else {
        throw new Error(ERROR_MESSAGES.GENERAL_ERROR);
    }
};


const ERROR_MESSAGES : Record<number | string, string> = {
    400: "잘못된 요청입니다.",
    401: "인증이 필요합니다. 다시 로그인해주세요.",
    403: "접근 권한이 없습니다.",
    404: "요청한 리소스를 찾을 수 없습니다.",
    408: "요청 시간이 초과되었습니다. 다시 시도해주세요.",
    429: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.",
    500: "서버 내부 오류가 발생했습니다.",
    502: "서버가 응답할 수 없습니다. 네트워크 문제일 수 있습니다.",
    503: "서비스를 이용할 수 없습니다. 유지보수 중일 수 있습니다.",
    504: "서버 응답 시간이 초과되었습니다. 네트워크 상태를 확인하세요.",
  
    SERVER_ERROR: "서버에서 에러가 발생했습니다.",
    NO_RESPONSE: "네트워크 오류가 발생했습니다. 인터넷 연결을 확인하세요.",
    GENERAL_ERROR: "에러가 발생했습니다.",
    FILE_ERROR : "파일을 다운로드할 수 없습니다."
  };