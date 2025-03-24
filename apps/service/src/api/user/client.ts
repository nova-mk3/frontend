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
    const res = await Authapi.get(`/nova/members`);
    return res.data.data;
  } catch (error) {
    return throwErrorMessage(error);
  }
}
