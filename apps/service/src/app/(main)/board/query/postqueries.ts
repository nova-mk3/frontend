/*
board에서 사용하는 react-query hooks 모음입니다
*/

import { ArchiveGetDetail } from "@/src/api/board/exam";
import {
  BoardAllList,
  BoardLatestList,
  IntegratedBoardGet,
  IntegratedBoardGetDetail,
  Params,
} from "@/src/api/board/integrated";
import { PostType } from "@/src/constant/board";
import { useSuspenseQuery } from "@tanstack/react-query";

interface SearchFilter {
  page: number;
  size: number;
  searchType: string;
  sortBy: string;
  sortDirection: string;
  keyword: string;
}

export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,

  listmain: () => [...postKeys.lists(), "main"] as const,

  list: (filters: SearchFilter) => [...postKeys.listmain(), filters] as const, //전체보기

  typelists: (postType: PostType) => [...postKeys.lists(), postType] as const,

  typelist: (filters: SearchFilter, postType: PostType) =>
    [...postKeys.lists(), postType, filters] as const,

  details: () => [...postKeys.all, "detail"] as const,
  detail: (postId: string) => [...postKeys.details(), postId] as const,
  latest: (boardId: string) =>
    [...postKeys.listmain(), "latest", boardId] as const,
};

export const usePostDetailQuery = (postId: string, boardId: string) => {
  return useSuspenseQuery({
    queryKey: postKeys.detail(postId),
    queryFn: () => IntegratedBoardGetDetail({ boardId, postId }),
  });
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
}: Omit<Params, "postId">) => {
  return useSuspenseQuery({
    queryKey: postKeys.typelist(
      { page, size, searchType, sortBy, sortDirection, keyword },
      postType
    ),
    queryFn: () =>
      IntegratedBoardGet({
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

export const usePostAllListQuery = ({
  page,
  size,
  sort,
  boardId,
}: {
  page: number;
  size: number;
  sort: string;
  boardId: string;
}) => {
  return useSuspenseQuery({
    queryKey: postKeys.list({ page, size, sort }),
    queryFn: () => BoardAllList({ page, size, sort, boardId }),
  });
};

export const usePostLatestListQuery = ({ boardId }: { boardId: string }) => {
  return useSuspenseQuery({
    queryKey: [...postKeys.latest(boardId)],
    queryFn: () => BoardLatestList({ boardId }),
  });
};

export const useArchiveDetailQuery = (postId: string, boardId: string) => {
  return useSuspenseQuery({
    queryKey: postKeys.detail(postId),
    queryFn: () => ArchiveGetDetail({ boardId, postId }),
  });
};
