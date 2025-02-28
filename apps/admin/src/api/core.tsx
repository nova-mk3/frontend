import axios from 'axios';
// localhost:3001로 요청을 보낼경우 
// 서버에서 CORS 정책을 1개만 할수있다 하여 오류가 발생하는중임.
// 현재 서버에서는 CORS정책을 3000, 8080, 3001 사용중
// 하지만 localghost:3000에서 요청을 보낼경우 문제없이 작동하므로 임시로 사용중
export const BASE_URL = 'http://localhost:3000';
export const EXTERNAL_URL = 'http://localhost:8080/api/v1';
import cookie from 'js-cookie';
const config = {
    baseURL: BASE_URL,
    withCredentials: true,
};
  


// axios 인스턴스 생성
export const api = axios.create(config); // 일반 API 요청용 인스턴스
export const Authapi = axios.create(config); // 인증이 필요한 요청용 인스턴스


// 요청 인터셉터: 쿠키에서 JWT를 읽어 Authorization 헤더에 추가
Authapi.interceptors.request.use((config) => {
  const token = cookie.get('token'); // 쿠키에서 JWT 토큰 읽기
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

Authapi.interceptors.response.use(
  (response) => {
    // 정상 응답인 경우 그대로 반환
    return response;
  },
  (error) => {
    // 에러 응답 처리
    if (typeof window === 'undefined') {
      // SSR 환경
      if (error.response && error.response.status === 401 || error.response.status === 403) {
        error.context.res.writeHead(302, { Location: '/signin' });
        error.context.res.end();
      }
    } else {
      // CSR 환경
      if (error.response && error.response.status === 401 || error.response.status ===403) {
        alert("토큰이 만료되었습니다")
        window.location.href="/signin";
      }
    }

    return Promise.reject(error);
  }
);