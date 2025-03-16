import cookie from 'js-cookie';
import { api } from '@/src/api/core';

export interface AdminLoginRequest {
    studentNumber: string;
    password: string;
}

//TODO : JWT 토큰을 따로 안주는거같음 확인이 필요함

export async function AdminLogin({ studentNumber , password }: AdminLoginRequest) {
  try {
    const response = await api.post('/nova/members/login', {
        studentNumber,
        password,
    });
    const { token } = response.data;
    if (token) {
      cookie.set('token', token, { expires: 1 /24 });
    }
    return response.data;
  } catch (error: any) {
    alert("로그인 실패: " + error.message);
    throw error;
  }
}