import { useQuery } from "@tanstack/react-query";
import {
  GetAllIntegratedPostsParams,
  GetIntegratedBoardsByCategoryParams,
  IntegratedBoardParams,
} from "../api/integrated.type";
import {
  AcrossBoardQueryOptions,
  postDetailQueryOptions,
  postLatestQueryOptions,
  postSearchQueryOptions,
} from "./options";
import { postKeys } from "./queryKey";
import { GetAllIntegratedBoards } from "../api/integrated";
import { GetBoardsExcludeExamParams } from "../api/main.type";

export const usePostDetailQuery = (postId: string, boardId: string) => {
  return useQuery(postDetailQueryOptions(postId, boardId));
};

export const usePostListQuery = ({
  postType,
  boardId,
  page,
  size,
  searchType,
  sortBy,
  sortDirection,
  keyword,
}: GetIntegratedBoardsByCategoryParams) => {
  return useQuery(
    postSearchQueryOptions({
      postType,
      page,
      size,
      boardId,
      searchType,
      sortBy,
      sortDirection,
      keyword,
    })
  );
};

export const usePostAllListQuery = ({
  boardId,
  page,
  size,
  searchType,
  sortBy,
  sortDirection,
  keyword,
}: GetAllIntegratedPostsParams) => {
  return useQuery({
    queryKey: postKeys.list({
      page,
      size,
      searchType,
      sortBy,
      sortDirection,
      keyword,
    }),
    queryFn: () =>
      GetAllIntegratedBoards({
        boardId,
        page,
        size,
        searchType,
        sortBy,
        sortDirection,
        keyword,
      }),
  });
};

export const usePostLatestListQuery = ({ boardId }: { boardId: string }) => {
  return useQuery(postLatestQueryOptions(boardId));
};

export const useAcrossBoardListQuery = ({
  size,
  page,
  sortBy,
  sortDirection,
}: GetBoardsExcludeExamParams) => {
  return useQuery(
    AcrossBoardQueryOptions({ size, page, sortBy, sortDirection })
  );
};
