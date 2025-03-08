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
    const response = await Authapi.post(
      `/nova/boards/${boardId}/picture-posts`,
      {
        title,
        content,
        imageFileIds,
      }
    );
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
    `/nova/boards/${boardId}/picture-posts/${postId}`
  );
  return response.data.data;
}

/*
게시글 수정
*/
export async function PictureBoardPut({
  title,
  content,
  fileIds,
  boardId,
  postId,
  deleteFileIds,
}: IntegratedPutRequest) {
  try {
    const response = await Authapi.put(
      `/nova/boards/${boardId}/picture-posts/${postId}`,
      {
        title,
        content,
        fileIds,
        deleteFileIds,
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
      `/nova/boards/${boardId}/picture-posts/${postId}`
    );
    return response.data.data;
  } catch (error: any) {
    throwErrorMessage(error);
  }
}
