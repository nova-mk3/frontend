import { throwErrorMessage } from "@/src/libs/utils/throwError";
import { api, Authapi } from "../core";
import { cookies } from "next/headers";

export async function IntegratedBoardGetDetail({
  postId,
  boardId,
}: {
  postId: string;
  boardId: string;
}) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("AUTH_TOKEN")?.value;
  try {
    // ✅ `fetch` 요청 시 `Cookie` 포함
    const data = await api.get(`/boards/${boardId}/posts/${postId}`, {
      headers: {
        Cookie: `AUTH_TOKEN=${authToken}`, // ✅ `AUTH_TOKEN`을 `Cookie` 헤더에 추가
      },
    });

    return data.data.data;
  } catch (error) {
    return throwErrorMessage(error);
  }
}

/*
 * 게시글 상세 조회
 */
export async function ArchiveGetDetail({
  postId,
  boardId,
}: {
  postId: string;
  boardId: string;
}) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("AUTH_TOKEN")?.value;
  try {
    const response = await Authapi.get(
      `/boards/${boardId}/exam-posts/${postId}`,
      {
        headers: {
          Cookie: `AUTH_TOKEN=${authToken}`, // ✅ `AUTH_TOKEN`을 `Cookie` 헤더에 추가
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throwErrorMessage(error);
  }
}

export async function PictureGetDetail({
  postId,
  boardId,
}: {
  postId: string;
  boardId: string;
}) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("AUTH_TOKEN")?.value;
  try {
    // ✅ `fetch` 요청 시 `Cookie` 포함
    const data = await api.get(`/boards/${boardId}/picture-posts/${postId}`, {
      headers: {
        Cookie: `AUTH_TOKEN=${authToken}`, // ✅ `AUTH_TOKEN`을 `Cookie` 헤더에 추가
      },
    });

    return data.data.data;
  } catch (error) {
    return throwErrorMessage(error);
  }
}
