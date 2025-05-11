import { Authapi } from "@/src/shared/api/core";
import { PostArchiveRequest, PutArchiveRequest } from "./exam_archive.type";
import { throwErrorMessage } from "@/src/shared/utils/throwError";
import { GetIntegratedBoardParams } from "../../board/api/integrated.type";

/**
 * 자료게시판 생성
 */
export async function PostArchive({
  title,
  content,
  year,
  subject,
  semester,
  professorName,
  fileIds,
  boardId,
}: PostArchiveRequest) {
  try {
    const response = await Authapi.post(`/boards/${boardId}/exam-posts`, {
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
 * 자료게시판 상세조회
 */
export async function GetArchive({
  postId,
  boardId,
}: GetIntegratedBoardParams) {
  try {
    const response = await Authapi.get(
      `/boards/${boardId}/exam-posts/${postId}`
    );
    return response.data.data;
  } catch (error) {
    throwErrorMessage(error);
  }
}

/**
 * 자료게시판 수정
 */

export async function PutArchive({
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
}: PutArchiveRequest) {
  try {
    const response = await Authapi.put(
      `/boards/${boardId}/exam-posts/${postId}`,
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

/**
 * 자료게시판 삭제
 */

export async function DeleteArchive({
  boardId,
  postId,
}: {
  boardId: string;
  postId: string;
}) {
  try {
    const response = await Authapi.delete(
      `/boards/${boardId}/exam-posts/${postId}`
    );
    return response.data;
  } catch (error: any) {
    throwErrorMessage(error);
  }
}
