import { queryOptions } from "@tanstack/react-query";
import { postKeys } from "./queryKey";
import {
  GetIntegratedBoard,
  GetIntegratedBoardsByCategory,
  GetRecentIntegratedBoards,
} from "../api/integrated";
import { GetBoardsExcludeExamParams } from "../api/main.type";
import { GetBoardsExcludeExam } from "../api/main";
import { GetIntegratedBoardsByCategoryParams } from "../api/integrated.type";
import {
  ServerGetBoardsExcludeExam,
  ServerGetIntegratedBoardsByCategory,
} from "../api/server";

export const postDetailQueryOptions = (postId: string, boardId: string) => {
  return queryOptions({
    queryKey: postKeys.detail(postId),
    queryFn: () => GetIntegratedBoard({ boardId, postId }),
  });
};

export const postLatestQueryOptions = (boardId: string) => {
  return queryOptions({
    queryKey: postKeys.latest(boardId),
    queryFn: () => GetRecentIntegratedBoards({ boardId }),
  });
};

export const AcrossBoardQueryOptions = ({
  size,
  page,
  sortDirection,
  sortBy,
}: GetBoardsExcludeExamParams) => {
  return queryOptions({
    queryKey: postKeys.list({ size, page, sortDirection, sortBy, keyword: "" }),
    queryFn: () => GetBoardsExcludeExam({ size, page, sortDirection, sortBy }),
  });
};

export const postSearchQueryOptions = ({
  page,
  size,
  searchType,
  sortBy,
  sortDirection,
  keyword,
  postType,
  boardId,
}: GetIntegratedBoardsByCategoryParams) => {
  return queryOptions({
    queryKey: postKeys.typelist(
      { page, size, searchType, sortBy, sortDirection, keyword },
      postType
    ),
    queryFn: () =>
      GetIntegratedBoardsByCategory({
        postType,
        page,
        size,
        boardId,
        searchType,
        sortBy,
        sortDirection,
        keyword,
      }),
  });
};

export const serverPostSearchQueryOptions = ({
  page,
  size,
  searchType,
  sortBy,
  sortDirection,
  keyword,
  postType,
  boardId,
}: GetIntegratedBoardsByCategoryParams) => {
  return queryOptions({
    queryKey: postKeys.typelist(
      { page, size, searchType, sortBy, sortDirection, keyword },
      postType
    ),
    queryFn: () =>
      ServerGetIntegratedBoardsByCategory({
        postType,
        page,
        size,
        boardId,
        searchType,
        sortBy,
        sortDirection,
        keyword,
      }),
  });
};

export const ServerAcrossBoardQueryOptions = ({
  size,
  page,
  sortDirection,
  sortBy,
}: GetBoardsExcludeExamParams) => {
  return queryOptions({
    queryKey: postKeys.list({ size, page, sortDirection, sortBy, keyword: "" }),
    queryFn: () =>
      ServerGetBoardsExcludeExam({ size, page, sortDirection, sortBy }),
  });
};
