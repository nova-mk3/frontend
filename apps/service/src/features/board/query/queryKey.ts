import { PostType } from "@/src/constant/board";
import { partialSearchFilter } from "@/src/shared/types/searchFilter.type";

export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,

  listmain: () => [...postKeys.lists(), "main"] as const,

  list: (filters: partialSearchFilter) =>
    [...postKeys.listmain(), filters] as const, //전체보기

  typelists: (postType: PostType) => [...postKeys.lists(), postType] as const,

  typelist: (filters: partialSearchFilter, postType: PostType) =>
    [...postKeys.lists(), postType, filters] as const,

  details: () => [...postKeys.all, "detail"] as const,
  detail: (postId: string) => [...postKeys.details(), postId] as const,
  latest: (boardId: string) =>
    [...postKeys.listmain(), "latest", boardId] as const,
};
