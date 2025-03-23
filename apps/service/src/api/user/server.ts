import { throwErrorMessage } from "@/src/libs/utils/throwError";
import { cookies } from "next/headers";
import { api } from "../core";

export async function getMemberId() {
  // ✅ 서버에서 쿠키 가져오기
  const cookieStore = await cookies();
  const authToken = cookieStore.get("AUTH_TOKEN")?.value;

  try {
    // ✅ `fetch` 요청 시 `Cookie` 포함
    const res = await api.get(`/members`, {
      headers: {
        Cookie: `AUTH_TOKEN=${authToken}`, // ✅ `AUTH_TOKEN`을 `Cookie` 헤더에 추가
      },
    });
    return res.data.data;
  } catch (error) {
    return throwErrorMessage(error);
  }
}

export async function getMember({ memberId }: { memberId: string }) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("AUTH_TOKEN")?.value;
  try {
    // ✅ `fetch` 요청 시 `Cookie` 포함
    const data = await api.get(`/members/${memberId}`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `AUTH_TOKEN=${authToken}`, // ✅ `AUTH_TOKEN`을 `Cookie` 헤더에 추가
      },
    });

    return data.data.data.memberResponse;
  } catch (error) {
    return throwErrorMessage(error);
  }
}
