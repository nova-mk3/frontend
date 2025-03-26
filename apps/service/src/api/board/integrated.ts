import { PostType } from "@/src/constant/board";
import { Authapi } from "../core";
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
  deleteFileIds,
}: IntegratedPutRequest) {
  try {
    const response = await Authapi.put(`/boards/${boardId}/posts/${postId}`, {
      title,
      content,
      fileIds,
      deleteFileIds,
    });
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

/*
게시판 BoardId 호출
*/

export async function BoardIdGet() {
  // proxy를 하긴하지만 여러번 하게되면 에러가 엄청 발생함
  // html을 정적으로 생성할때, rsc를 같이 생성함 -> SSG
  // SSR인 경우 동적으로 생성하기때문에 HTML 파일이 없음
  console.log("BoardId api 호출");
  try {
    const response = await fetch("http://localhost:8080/api/v1/boards", {
      method: "GET",
    });

    // response.ok가 false면 HTTP 에러 상태 (4xx, 5xx 등)
    if (!response.ok) {
      throw new Error(`Failed to fetch /boards. Status: ${response.status}`);
    }

    // JSON 파싱
    const json = await response.json();

    // 서버에서 { data: ... } 형태를 내려준다고 가정
    return json.data;
  } catch (error) {
    // 사용자 정의 에러 처리 로직
    throwErrorMessage(error);
  }
}
