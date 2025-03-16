import { throwErrorMessage } from "@/src/libs/utils/throwError";
import { cookies } from "next/headers";

export async function getMemberId() {
  // ✅ 서버에서 쿠키 가져오기
  const cookieStore = await cookies();
  const authToken = cookieStore.get("AUTH_TOKEN")?.value;

  if (!authToken) {
    console.error("🔴 AUTH_TOKEN 없음, 인증 실패");
    return null;
  }
  try {
    // ✅ `fetch` 요청 시 `Cookie` 포함
    const res = await fetch(`http://localhost:8080/api/v1/members`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `AUTH_TOKEN=${authToken}`, // ✅ `AUTH_TOKEN`을 `Cookie` 헤더에 추가
      },
      credentials: "include", // ✅ 브라우저에서 `Cookie` 자동 포함
    });

    if (!res.ok) {
      console.error("🔴 Spring Boot API 요청 실패:", res.status);
      return null;
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("🔴 getMemberId 오류:", error);
    return null;
  }
}

export async function getMember({ memberId }: { memberId: string }) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("AUTH_TOKEN")?.value;
  try {
    // ✅ `fetch` 요청 시 `Cookie` 포함
    const res = await fetch(
      `http://localhost:8080/api/v1/members/${memberId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `AUTH_TOKEN=${authToken}`, // ✅ `AUTH_TOKEN`을 `Cookie` 헤더에 추가
        },
        credentials: "include", // ✅ 브라우저에서 `Cookie` 자동 포함
      }
    );

    if (!res.ok) {
      console.error("🔴 Spring Boot API 요청 실패:", res.status);
      return null;
    }

    const data = await res.json();
    return data.data.memberResponse;
  } catch (error) {
    return throwErrorMessage(error);
  }
}
