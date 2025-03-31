import axios from "axios";
export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const config = {
  baseURL: BASE_URL,
  withCredentials: true,
};

// axios 인스턴스 생성
export const api = axios.create(config); // 일반 API 요청용 인스턴스
export const Authapi = axios.create(config); // 인증이 필요한 요청용 인스턴스

Authapi.interceptors.response.use(
  async (response) => {
    // // 정상 응답인 경우 그대로 반환
    // const startTime = Date.now();
    // const elapsedTime = Date.now() - startTime;
    // const remainingTime = Math.max(1000 - elapsedTime, 0);

    // await new Promise((resolve) => setTimeout(resolve, remainingTime));

    return response;
  },
  (error) => {
    // 에러 응답 처리 :  CSR 환경
    console.log(error);
    if (error.response) {
      if (error.response.status === 401) {
        alert("로그인 해주세요");
        const currentPath = window.location.pathname + window.location.search;
        window.location.href = `/signin?redirect=${decodeURI(currentPath)}`;
      }
      return;
    }
    return Promise.reject(error);
  }
);
