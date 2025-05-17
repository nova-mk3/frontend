import { PostType } from "@/src/constant/board";
import { searchFilter } from "@/src/shared/types/searchFilter.type";

export interface IntegratedBoardParams extends searchFilter {
  postId: string;
  postType: PostType;
  boardId: string;
}

/**
 * 게시글 생성 타입
 */
export interface PostIntegratedBoardRequest {
  title: string;
  content: string;
  postType: string;
  fileIds: string[];
  boardId: string;
}

/**
 * 게시글 수정 타입
 */
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
