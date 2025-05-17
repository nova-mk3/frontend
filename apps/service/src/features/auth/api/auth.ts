import { api, Authapi } from "@/src/shared/api/core";
import { throwErrorMessage } from "@/src/shared/utils/throwError";
import {
  GraduationSignUpRequest,
  MemberSignUpRequest,
  SignUpData,
} from "./auth.type";

export async function verifyEmail(email: string) {
  const response = await api.post("/email-auth", { email: email });
  return response.data;
}
export async function verifyEmailCode({
  email,
  authCode,
}: {
  email: string;
  authCode: string;
}) {
  try {
    const response = await api.post(`/email-auth/check`, {
      email,
      authCode,
    });
    return response.data; // 요청 성공 시 데이터 반환
  } catch (error) {
    throwErrorMessage(error);
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
    const response = await api.post("/members/login", {
      studentNumber,
      password,
    });
    return response; // 로그인 성공 시 반환할 데이터
  } catch (error: any) {
    throwErrorMessage(error);
  }
}

export async function verifyAccessToken(accessToken: string) {
  try {
    const response = await api.post(
      `/members/access-token/verify?accessToken=${accessToken}`
    );
    return response.data;
  } catch (error) {
    return {
      status: 500,
    };
  }
}

export const ProfileUploadAPI = async (formdata: FormData) => {
  try {
    const response = await Authapi.post(`/members/profile-photo`, formdata);
    return response.data;
  } catch (error: any) {
    throwErrorMessage(error);
  }
};

export async function logout() {
  try {
    const response = await Authapi.get(`/members/logout`);
    return response.data;
  } catch (error) {
    throwErrorMessage(error);
  }
}

export async function signup(signUpData: SignUpData) {
  // graduation이 false면 graduationSignUpRequest를 보내지 않고,
  // true면 graduationSignUpRequest도 함께 포함해서 보낸다.
  const { memberSignUpRequest, graduationSignUpRequest } = signUpData;

  // graduationSignUpRequest를 넣을지 말지 분기
  const requestBody: any = {
    memberSignUpRequest: {
      ...memberSignUpRequest,
    },
  };

  // graduation이 true일 경우에만 graduationSignUpRequest 추가
  if (memberSignUpRequest.graduation && graduationSignUpRequest) {
    requestBody.graduationSignUpRequest = {
      ...graduationSignUpRequest,
    };
  }

  console.log(requestBody);

  try {
    const response = await api.post(`/members`, {
      ...requestBody,
    });
    return response.data;
  } catch (e) {
    throwErrorMessage(e);
  }
}
