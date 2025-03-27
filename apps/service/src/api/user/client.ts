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
