// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import * as cookie from 'cookie';
import { api, EXTERNAL_URL } from '@/src/api/core';

/*
서버에서 쿠키를 만들어 사용하지만 결국 httpOnly를 사용해 보안을 강화하려면 외부서버에서 jwt를 쿠키로 처리해야한다
*/
export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // JSON 형식의 요청 본문 읽기
    const { studentNumber, password } = body;
    // 외부 서버에 로그인 요청
    const externalResponse = await api.post(`${EXTERNAL_URL}/members/login`, {
      studentNumber,
      password,
    });

    // Authorization 헤더에서 토큰 추출
    const authorizationHeader = externalResponse.headers['authorization'];
    if (!authorizationHeader) {
      throw new Error('Authorization 헤더가 존재하지 않습니다.');
    }

    const token = authorizationHeader.replace('Bearer ', '');

    // NextResponse로 쿠키 설정
    const response = NextResponse.json({ message: '로그인 성공' });
    response.headers.set(
      'Set-Cookie',
      cookie.serialize('token', token, {
        httpOnly: false,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60 * 24 * 7, // 7일간 유효
        sameSite: 'strict',
        path: '/',
      })
    );

    return response;
  } catch (error) {
    console.log('로그인 에러:', error);
    return NextResponse.json({ message: '로그인 실패' }, { status: 401 });
  }
}
