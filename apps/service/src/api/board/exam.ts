import { throwErrorMessage } from "@/src/libs/utils/throwError";
import { Authapi } from "../core";

export interface ArchivePostRequest {
  title: string;
  content: string;
  year: number;
  subject: string;
  semester: string;
  professorName: string;
  fileIds: string[];
  boardId: string;
}

/*
게시글 작성
*/
export async function ArchivePost({
  title,
  content,
  year,
  subject,
  semester,
  professorName,
  fileIds,
  boardId,
}: ArchivePostRequest) {
  try {
    const response = await Authapi.post(`/nova/boards/${boardId}/exam-posts`, {
      title,
      content,
      year,
      subject,
      semester,
      professorName,
      fileIds,
    });
    return response.data.data;
  } catch (error: any) {
    throwErrorMessage(error);
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
  try {
    const response = await Authapi.get(
      `/nova/boards/${boardId}/exam-posts/${postId}`
    );
    return response.data.data;
  } catch (error) {
    throwErrorMessage(error);
  }
}
/*
게시글 수정
*/

export interface ArchivePutRequest {
  title: string;
  content: string;
  year: number;
  subject: string;
  semester: string;
  professorName: string;
  fileIds: string[];
  boardId: string;
  postId: string;
  deleteFileIds: string[];
}

export async function ArchivePut({
  title,
  content,
  year,
  subject,
  semester,
  professorName,
  fileIds,
  boardId,
  postId,
  deleteFileIds,
}: ArchivePutRequest) {
  try {
    const response = await Authapi.put(
      `/nova/boards/${boardId}/exam-posts/${postId}`,
      {
        title,
        content,
        year,
        subject,
        semester,
        professorName,
        fileIds,
        boardId,
        postId,
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

export async function ArchiveDelete({
  boardId,
  postId,
}: {
  boardId: string;
  postId: string;
}) {
  try {
    const response = await Authapi.delete(
      `/nova/boards/${boardId}/exam-posts/${postId}`
    );
    return response.data;
  } catch (error: any) {
    throwErrorMessage(error);
  }
}
