import { throwErrorMessage } from "@/src/shared/utils/throwError";

import { Authapi } from "@/src/shared/api/core";
import {
  GetAllIntegratedPostsParams,
  GetIntegratedBoardParams,
  GetIntegratedBoardsByCategoryParams,
  IntegratedBoardParams,
  PostIntegratedBoardRequest,
  PutIntegratedBoardRequest,
} from "./integrated.type";

/**
 * 게시글 생성
 */
export async function PostIntegratedBoard({
  title,
  content,
  postType,
  fileIds,
  boardId,
}: PostIntegratedBoardRequest) {
  try {
    const response = await Authapi.post(`/boards/${boardId}/posts`, {
      title,
      content,
      postType,
      fileIds,
    });
    return response.data.data;
  } catch (error: any) {
    throwErrorMessage(error);
  }
}

/**
 * 카테고리별 게시글 조회
 */
export async function GetIntegratedBoardsByCategory({
  postType,
  boardId,
  page,
  size,
  searchType,
  sortBy,
  sortDirection,
  keyword,
}: GetIntegratedBoardsByCategoryParams) {
  try {
    const response = await Authapi.get(
      `/boards/${boardId}/posts/search?postType=${postType}&page=${page}&size=${size}&searchType=${searchType}&keyword=${keyword}&sortBy=${sortBy}&sortDirection=${sortDirection}`
    );

    console.log(response);
    return response.data.data;
  } catch (error) {
    throwErrorMessage(error);
  }
}

/**
 * 게시글 상세 조회
 */
export async function GetIntegratedBoard({
  postId,
  boardId,
}: GetIntegratedBoardParams) {
  try {
    const response = await Authapi.get(`/boards/${boardId}/posts/${postId}`);
    return response.data.data;
  } catch (error) {
    throwErrorMessage(error);
  }
}

/*
 * 통합 게시판 전체글 보기 조회
 */
export async function GetAllIntegratedBoards({
  boardId,
  page,
  size,
  searchType,
  keyword,
  sortBy,
  sortDirection,
}: GetAllIntegratedPostsParams) {
  try {
    const response = await Authapi.get(
      `/boards/${boardId}/posts/all/search?page=${page}&size=${size}&searchType=${searchType}&keyword=${keyword}&sortBy=${sortBy}&sortDirection=${sortDirection}`
    );
    return response.data.data;
  } catch (error) {
    throwErrorMessage(error);
  }
}

/*
 * 각 PostType(QnA, 자유게시판, 자기소개, 공지사항)별 최신 6개 게시글 조회
 */
export async function GetRecentIntegratedBoards({
  boardId,
}: {
  boardId: string;
}) {
  try {
    const response = await Authapi.get(`/boards/${boardId}/posts/latest`);

    return response.data.data;
  } catch (error) {
    throwErrorMessage(error);
  }
}

/**
 * 게시글 수정
 */

export async function PutIntegratedBoard({
  title,
  content,
  fileIds,
  boardId,
  postId,
  postType,
  deleteFileIds,
}: PutIntegratedBoardRequest) {
  try {
    const response = await Authapi.put(`/boards/${boardId}/posts/${postId}`, {
      title,
      content,
      fileIds,
      deleteFileIds,
      postType,
    });
    return response.data.data;
  } catch (error: any) {
    throwErrorMessage(error);
  }
}

/*
게시글 삭제
*/
export async function DeleteIntegratedBoard({
  boardId,
  postId,
}: Partial<IntegratedBoardParams>) {
  try {
    const response = await Authapi.delete(`/boards/${boardId}/posts/${postId}`);
    return response.data.data;
  } catch (error: any) {
    throwErrorMessage(error);
  }
}
