import axios from "axios";
// localhost:3001로 요청을 보낼경우
// 서버에서 CORS 정책을 1개만 할수있다 하여 오류가 발생하는중임.
// 현재 서버에서는 CORS정책을 3000, 8080, 3001 사용중
// 하지만 localghost:3000에서 요청을 보낼경우 문제없이 작동하므로 임시로 사용중

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const config = {
  baseURL: BASE_URL,
  withCredentials: true,
};

export const api = axios.create(config);
export const Authapi = axios.create(config);

Authapi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        alert("토큰이 만료되었습니다. 다시 로그인해주세요");
        window.location.href = "/admin/signin";
      }
    }

    return Promise.reject(error);
  }
);
