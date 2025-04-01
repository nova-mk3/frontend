import { throwErrorMessage } from "@/src/libs/utils/throwError";
import { Authapi } from "../core";

export async function getMember({ memberId }: { memberId: string }) {
  try {
    const res = await Authapi.get(`/members/${memberId}`);
    return res.data.data.memberResponse;
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
