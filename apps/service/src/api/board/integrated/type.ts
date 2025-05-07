import { PostType } from "@/src/types/post.type";
import { searchFilter } from "@/src/types/searchFilter.type";

export interface IntegratedBoardParams extends searchFilter {
  postId: string;
  postType: PostType;
  boardId: string;
}

export interface PostIntegratedBoardRequest {
  title: string;
  content: string;
  postType: string;
  fileIds: string[];
  boardId: string;
}

export interface PutIntegratedBoardRequest {
  title: string;
  postType: string;
  content: string;
  boardId: string;
  fileIds: string[];
  postId: string;
  deleteFileIds: string[];
}

/**
 * 카테고리 별 게시글 조회 타입
 */

export type GetIntegratedBoardsByCategoryParams = Pick<
  IntegratedBoardParams,
  | "postType"
  | "boardId"
  | "page"
  | "size"
  | "searchType"
  | "sortBy"
  | "sortDirection"
  | "keyword"
>;

/*
 * 게시글 상세 조회
 */
export type GetIntegratedBoardParams = Pick<
  IntegratedBoardParams,
  "postId" | "boardId"
>;

/*
 * 통합 게시판 전체글 보기 조회
 */
export type GetAllIntegratedPostsParams = Pick<
  IntegratedBoardParams,
  | "boardId"
  | "page"
  | "size"
  | "searchType"
  | "keyword"
  | "sortBy"
  | "sortDirection"
>;
