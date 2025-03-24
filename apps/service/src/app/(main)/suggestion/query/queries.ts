import { SuggestionGet, SuggestionGetDetail } from "@/src/api/board/suggestion";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { SuggestionDetail } from "../[id]/PostDetail";
import { SearchFiilterParamType } from "@/src/api/board/integrated";

type SearchFilter = SearchFiilterParamType;

export const suggestionKeys = {
  all: ["suggestion"] as const,
  lists: () => [...suggestionKeys.all, "list"] as const,
  list: (filters: SearchFilter) =>
    [...suggestionKeys.lists(), filters] as const, //전체보기
  details: () => [...suggestionKeys.all, "detail"] as const, //상세보기
  detail: (postId: string) =>
    [...suggestionKeys.all, "detail", postId] as const, //상세보기
};

export const useSuggestionListQuery = ({
  page,
  size,
  searchType,
  sortBy,
  sortDirection,
  keyword,
}: SearchFiilterParamType) => {
  return useQuery({
    queryKey: suggestionKeys.list({
      page,
      size,
      searchType,
      sortBy,
      sortDirection,
      keyword,
    }),
    queryFn: () =>
      SuggestionGet({ page, size, searchType, sortBy, sortDirection, keyword }),
  });
};

export const useSuggestionDetailQuery = (postId: string) => {
  return useQuery<SuggestionDetail>({
    queryKey: suggestionKeys.detail(postId),
    queryFn: () => SuggestionGetDetail(postId),
  });
};
