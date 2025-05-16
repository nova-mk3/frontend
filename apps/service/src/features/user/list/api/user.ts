import { Authapi } from "@/src/shared/api/core";
import { throwErrorMessage } from "@/src/shared/utils/throwError";

export async function UserListGet({ grade }: { grade: string }) {
  try {
    const response = await Authapi.get(`/members?grade=${grade}`);
    return response.data.data; // 요청 성공 시 데이터 반환
  } catch (error) {
    throwErrorMessage(error);
  }
}

export async function ExecutiveList({ year }: { year: string }) {
  try {
    const response = await Authapi.get(`/members/executive-histories/${year}`);
    return response.data.data; // 요청 성공 시 데이터 반환
  } catch (error) {
    throwErrorMessage(error);
  }
}

export async function getMember({ memberId }: { memberId: string }) {
  try {
    const res = await Authapi.get(`/members/${memberId}`);
    return res.data.data;
  } catch (error) {
    throwErrorMessage(error);
  }
}

export async function getMemberId() {
  try {
    // ✅ `fetch` 요청 시 `Cookie` 포함
    const res = await Authapi.get(`/members`);
    return res.data.data;
  } catch (error: any) {
    // 로그인 에러 발생하면 그냥 로그아웃처럼 보이게 하기!
    return "";
  }
}

export async function getSimpleProfie() {
  try {
    // ✅ `fetch` 요청 시 `Cookie` 포함
    const res = await Authapi.get(`/members/simple-profile`);
    return res.data.data;
  } catch (error: any) {
    throwErrorMessage(error);
  }
}

export const UserProfileUploadAPI = async ({
  formdata,
  memberId,
}: {
  formdata: FormData;
  memberId: string;
}) => {
  try {
    const response = await Authapi.post(
      `/members/${memberId}/profile-photo`,
      formdata
    );
    return response.data.data;
  } catch (error: any) {
    throwErrorMessage(error);
  }
};

export const UserProfileDeleteAPI = async ({
  profileMemberId,
}: {
  profileMemberId: string;
}) => {
  try {
    const response = await Authapi.delete(
      `/members/${profileMemberId}/profile-photo`
    );
    return response.data.data;
  } catch (error: any) {
    throwErrorMessage(error);
  }
};

export const PutProfileIdAPI = async ({
  profileMemberId,
  fileId,
}: {
  profileMemberId: string;
  fileId: string;
}) => {
  console.log(fileId);
  try {
    const response = await Authapi.put(
      `/members/${profileMemberId}/profile-photo`,
      fileId,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data;
  } catch (error: any) {
    throwErrorMessage(error);
  }
};

export interface MemberPutRequest {
  studentNumber: string;
  name: string;
  graduation: boolean;
  grade: string;
  semester: string;
  absence: boolean;
  profilePhoto?: string;
  phone?: string;
  birth?: string;
  introduction?: string;
}

export interface GraduationPutRequest {
  year: string;
  contact: boolean;
  work: boolean;
  job: string;
  contactInfo?: string;
  contactDescription?: string;
}

export interface ProfileUpdateData {
  // memberSignUpRequest에 필요한 모든 필드
  MemberPutRequest: MemberPutRequest;

  // graduation === true일 때만 필요한 필드
  GraduationPutRequest?: GraduationPutRequest;
}

export async function PutUserProfile({
  putUserData,
  profileMemberId,
}: {
  putUserData: ProfileUpdateData;
  profileMemberId: string;
}) {
  // graduation이 false면 graduationSignUpRequest를 보내지 않고,
  // true면 graduationSignUpRequest도 함께 포함해서 보낸다.
  const { MemberPutRequest, GraduationPutRequest } = putUserData;

  // graduationSignUpRequest를 넣을지 말지 분기
  const requestBody: any = {
    updateMemberProfileRequest: {
      ...MemberPutRequest,
    },
  };

  // graduation이 true일 경우에만 graduationSignUpRequest 추가
  if (MemberPutRequest.graduation && MemberPutRequest) {
    requestBody.updateGraduationRequest = {
      ...GraduationPutRequest,
    };
  }

  console.log(requestBody);

  try {
    const response = await Authapi.put(`/members/${profileMemberId}`, {
      ...requestBody,
    });
    return response.data;
  } catch (e) {
    throwErrorMessage(e);
  }
}

export interface ChangePwdType {
  profileMemberId: string;
  currentPassword: string;
  newPassword: string;
  checkNewPassword: string;
}
export const UserPasswordPut = async ({
  profileMemberId,
  currentPassword,
  newPassword,
  checkNewPassword,
}: ChangePwdType) => {
  try {
    const response = await Authapi.put(`/members/${profileMemberId}/password`, {
      currentPassword,
      newPassword,
      checkNewPassword,
    });
    return response.data;
  } catch (e) {
    throwErrorMessage(e);
  }
};

export async function userVerifyEmail({
  profileMemberId,
  email,
}: {
  profileMemberId: string;
  email: string;
}) {
  const response = await Authapi.post(
    `/members/${profileMemberId}/email/send`,
    { email }
  );
  return response.data;
}

export async function userVerifyEmailCode({
  profileMemberId,
  email,
  authCode,
}: {
  profileMemberId: string;
  email: string;
  authCode: string;
}) {
  const response = await Authapi.post(
    `/members/${profileMemberId}/email/check`,
    { email, authCode }
  );
  return response.data;
}

export async function PutUserEmail({
  profileMemberId,
  email,
}: {
  profileMemberId: string;
  email: string;
}) {
  try {
    const response = await Authapi.put(`/members/${profileMemberId}/email`, {
      email,
    });
    return response.data;
  } catch (e) {
    throwErrorMessage(e);
  }
}
