import { throwErrorMessage } from "@/src/libs/utils/throwError";
import { EXTERNAL_URL } from "../core";

export async function PictureGetDetail({
  authToken,
  postId,
  boardId,
}: {
  authToken: string | undefined;
  postId: string;
  boardId: string;
}) {
  try {
    // ✅ `fetch` 요청 시 `Cookie` 포함
    const res = await fetch(
      `${EXTERNAL_URL}/boards/${boardId}/picture-posts/${postId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `AUTH_TOKEN=${authToken}`, // ✅ `AUTH_TOKEN`을 `Cookie` 헤더에 추가
        },
        credentials: "include", // ✅ 브라우저에서 `Cookie` 자동 포함
      }
    );

    const data = await res.json();
    return data.data;
  } catch (error) {
    return throwErrorMessage(error);
  }
}
