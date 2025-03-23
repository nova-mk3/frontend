import { throwErrorMessage } from "@/src/libs/utils/throwError";
import { api } from "../core";

export async function PictureGetDetail({
  postId,
  boardId,
}: {
  postId: string;
  boardId: string;
}) {
  try {
    // ✅ `fetch` 요청 시 `Cookie` 포함
    const data = await api.get(`/boards/${boardId}/picture-posts/${postId}`);

    return data.data.data;
  } catch (error) {
    return throwErrorMessage(error);
  }
}
