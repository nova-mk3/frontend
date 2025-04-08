import { PostType } from "@/src/constant/board";
import { api, Authapi } from "../core";
import { throwErrorMessage } from "@/src/libs/utils/throwError";

export interface IntegradePostRequest {
  title: string;
  content: string;
  postType: string;
  fileIds: string[];
  boardId: string;
}

export interface Params {
  postId: string;
  postType: PostType;
  boardId: string;
  size: number;
  page: number;
  keyword: string;
  searchType: string;
  sortBy: string;
  sortDirection: string;
}

// 선택
export type BoardGetParamType = Pick<Params, "postId" | "boardId">;
export type BoardIdParams = Pick<Params, "boardId">;

// 제외한 나머지
export type BoardCategoryGetParamType = Omit<Params, "postId">;
export type BoardAllListParamType = Omit<Params, "postId" | "postType">;
export type SearchFiilterParamType = Omit<
  Params,
  "postId" | "postType" | "boardId"
>;
export type AcrossBoardParamType = Omit<
  Params,
  "postId" | "postType" | "boardId" | "keyword" | "searchType"
>;
/*
게시글 작성
*/
export async function IntegratedBoardPost({
  title,
  content,
  postType,
  fileIds,
  boardId,
}: IntegradePostRequest) {
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

/*
 * 카테고리별 목록 조회
 */
export async function IntegratedBoardGet({
  postType,
  boardId,
  page,
  size,
  searchType,
  sortBy,
  sortDirection,
  keyword,
}: BoardCategoryGetParamType) {
  try {
    const response = await Authapi.get(
      `/boards/${boardId}/posts/search?postType=${postType}&page=${page}&size=${size}&searchType=${searchType}&keyword=${keyword}&sortBy=${sortBy}&sortDirection=${sortDirection}`
    );
    return response.data.data;
  } catch (error) {
    throwErrorMessage(error);
  }
}

/*
 * 게시글 상세 조회
 */
export async function IntegratedBoardGetDetail({
  postId,
  boardId,
}: BoardGetParamType) {
  try {
    const response = await Authapi.get(`/boards/${boardId}/posts/${postId}`);
    return response.data.data;
  } catch (error) {
    throwErrorMessage(error);
  }
}

/*
 * 전체 게시판 목록 조회
 */
export async function BoardAllList({
  boardId,
  page,
  size,
  searchType,
  keyword,
  sortBy,
  sortDirection,
}: BoardAllListParamType) {
  console.log("하이");
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
export async function BoardLatestList({ boardId }: BoardIdParams) {
  try {
    const response = await Authapi.get(`/boards/${boardId}/posts/latest`);

    return response.data.data;
  } catch (error) {
    throwErrorMessage(error);
  }
}

/*
게시글 수정!
*/

export interface IntegratedPutRequest {
  title: string;
  postType: string;
  content: string;
  boardId: string;
  fileIds: string[];
  postId: string;
  deleteFileIds: string[];
}

export async function IntegratedBoardPut({
  title,
  content,
  fileIds,
  boardId,
  postId,
  postType,
  deleteFileIds,
}: IntegratedPutRequest) {
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

export async function IntegratedBoardDelete({
  boardId,
  postId,
}: BoardGetParamType) {
  try {
    const response = await Authapi.delete(`/boards/${boardId}/posts/${postId}`);
    return response.data.data;
  } catch (error: any) {
    throwErrorMessage(error);
  }
}

export async function getAcrossBoard({
  size,
  page,
  sortDirection,
  sortBy,
}: AcrossBoardParamType) {
  try {
    const response = await api.get(
      `/posts/across-boards?sortBy=${sortBy}&sortDirection=${sortDirection}&page=${page}&size=${size}`
    );
    return response.data.data;
  } catch (error: any) {
    throwErrorMessage(error);
  }
}
