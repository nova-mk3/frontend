import { throwErrorMessage } from "@/src/libs/utils/throwError";
import { api } from "../core";

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
    const data = await api.get(
      `/nova/boards/${boardId}/picture-posts/${postId}`,
      {
        headers: {
          Cookie: `AUTH_TOKEN=${authToken}`, // ✅ `AUTH_TOKEN`을 `Cookie` 헤더에 추가
        },
      }
    );

    return data.data.data;
  } catch (error) {
    return throwErrorMessage(error);
  }
}
