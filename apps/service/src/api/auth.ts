import { BASE_URL } from "../constant/config";
import { api } from "./core";
import axios, { AxiosError } from "axios";

export async function verifyEmail(email : string) {
  const response = await api.post('/nova/email-auth', { email: email });
  return response.data;
}

export async function verifyEmailCode({ email, authCode }: { email: string; authCode: string }) {
  try {
    const response = await api.post(`/nova/email-auth/check`, {
      email,
      authCode,
    });
    return response.data; // 요청 성공 시 데이터 반환
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios 에러 처리 (서버 응답이 있는 경우)
      throw new Error(error.response?.data?.message || "Something went wrong!");
    } else {
      // 일반 에러 처리
      throw new Error("Unexpected error occurred.");
    }
  }
}


/*
response 객체는 서버를 통해 스트림 형태로 존재한다.
스트림 객체는 읽을 준비가 되어 있는 큐에서 대기합니다.
그래서 비동기적으로 돌아가는것 같다! ->  그래서 우리는 그 스트림 데이터를 자바스크립트로 사용하기위해
문자열 json으로 되어있는걸 .json으로 가져와야한다. 이때 .json 역시 비동기로 작동해 await를 사용하거나 then()으로 값을 처리해줘야함!
*/

export async function login({
  studentNumber,
  password,
}: {
  studentNumber: string;
  password: string;
}) {
  try {
    const response = await api.post("/api/auth/login", {
      studentNumber,
      password,
    });
    return response.data; // 로그인 성공 시 반환할 데이터
  } catch (error: any) {
    // React Query에서 사용할 에러만 던져줌
    if (error.response) {
      const message = error.response.data?.message || "서버에서 에러가 발생했습니다.";
      throw new Error(message);
    } else if (error.request) {
      throw new Error("서버에 응답이 없습니다. 네트워크 상태를 확인하세요.");
    } else {
      throw new Error(error.message || "에러가 발생했습니다.");
    }
  }
}


export interface MemberSignUpRequest {
  studentNumber: string;
  password: string;
  name: string;
  email: string;
  graduation: boolean; 
  grade: number;
  semester: number;
  absence: boolean;
  profilePhoto?: string;
  phone?: string;
  birth?: string;
}

export interface GraduationSignUpRequest {
  year: number;
  contact: boolean;
  work: boolean;
  job: string;
  contactInfo?: string;
  contactDescription?: string;
}

export interface SignUpData {
  // memberSignUpRequest에 필요한 모든 필드
  memberSignUpRequest: MemberSignUpRequest;

  // graduation === true일 때만 필요한 필드
  graduationSignUpRequest?: GraduationSignUpRequest;
}

export async function signup(signUpData: SignUpData) {
  // graduation이 false면 graduationSignUpRequest를 보내지 않고,
  // true면 graduationSignUpRequest도 함께 포함해서 보낸다.
  const { memberSignUpRequest, graduationSignUpRequest } = signUpData;

  // graduationSignUpRequest를 넣을지 말지 분기
  const requestBody: any = {
    memberSignUpRequest: {
      ...memberSignUpRequest
    }
  };

  // graduation이 true일 경우에만 graduationSignUpRequest 추가
  if (memberSignUpRequest.graduation && graduationSignUpRequest) {
    requestBody.graduationSignUpRequest = {
      ...graduationSignUpRequest
    };
  }
  
  const response = await fetch(`/nova/members`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log(errorData);
    const message = errorData?.message || "에러가 발생했습니다.";
    throw new Error(message);
  }

  return response.json();
}





