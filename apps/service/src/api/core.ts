import axios from "axios";
export const BASE_URL = "http://localhost:3000";
export const EXTERNAL_URL = "http://localhost:8080/api/v1";
const config = {
  baseURL: BASE_URL,
  withCredentials: true,
};

// axios 인스턴스 생성
export const api = axios.create(config); // 일반 API 요청용 인스턴스
export const Authapi = axios.create(config); // 인증이 필요한 요청용 인스턴스

Authapi.interceptors.response.use(
  (response) => {
    // 정상 응답인 경우 그대로 반환
    return response;
  },
  (error) => {
    // 에러 응답 처리 :  CSR 환경
    console.log(error);
    if (typeof window !== "undefined") {
      console.log(error);

      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        alert("토큰이 만료되었습니다");
        const currentPath = window.location.pathname + window.location.search;
        window.location.href = `/signin?redirect=${decodeURIComponent(currentPath)}`;
      }
    }
    return Promise.reject(error);
  }
);
