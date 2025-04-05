import { throwErrorMessage } from "@/src/libs/utils/throwError";
import { Authapi } from "../core";

/*
게시글 작성
*/

export interface PicturePostReqeust {
  title: string;
  content: string;
  imageFileIds: string[];
  boardId: string;
}

export async function PicturePost({
  title,
  content,
  imageFileIds,
  boardId,
}: PicturePostReqeust) {
  try {
    const response = await Authapi.post(`/boards/${boardId}/picture-posts`, {
      title,
      content,
      imageFileIds,
    });
    return response.data.data;
  } catch (error: any) {
    throwErrorMessage(error);
  }
}

/*
 * 게시글 상세 조회
 */
export async function PictureGetDetail({
  postId,
  boardId,
}: {
  postId: string;
  boardId: string;
}) {
  const response = await Authapi.get(
    `/boards/${boardId}/picture-posts/${postId}`
  );
  return response.data.data;
}

/*
게시글 수정
*/

export interface PicturePutRequest {
  title: string;
  content: string;
  boardId: string;
  imageFileIds: string[];
  postId: string;
  deleteImageFileIds: string[];
}
export async function PicturePut({
  title,
  content,
  imageFileIds,
  boardId,
  postId,
  deleteImageFileIds,
}: PicturePutRequest) {
  try {
    const response = await Authapi.put(
      `/boards/${boardId}/picture-posts/${postId}`,
      {
        title,
        content,
        imageFileIds,
        deleteImageFileIds,
      }
    );
    return response.data.data;
  } catch (error: any) {
    throwErrorMessage(error);
  }
}

/*
  게시글 삭제
  */

export interface IntegratedPutRequest {
  title: string;
  content: string;
  boardId: string;
  fileIds: string[];
  postId: string;
  deleteFileIds: string[];
}

export async function PictureBoardDelete({
  boardId,
  postId,
}: {
  boardId: string;
  postId: string;
}) {
  try {
    const response = await Authapi.delete(
      `/boards/${boardId}/picture-posts/${postId}`
    );
    return response.data.data;
  } catch (error: any) {
    throwErrorMessage(error);
  }
}
