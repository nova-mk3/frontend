import axios from "axios";

const config = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
};
console.log(config);

// axios 인스턴스 생성
export const api = axios.create(config); // 일반 API 요청용 인스턴스
export const Authapi = axios.create(config); // 인증이 필요한 요청용 인스턴스

Authapi.interceptors.response.use(
  async (response) => {
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
    }
    return Promise.reject(error);
  }
);
