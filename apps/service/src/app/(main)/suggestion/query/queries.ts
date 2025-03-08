import { SuggestionGet, SuggestionGetDetail } from "@/src/api/board/suggestion";
import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import { SuggestionDetail } from "../[id]/PostDetail";

interface SearchFilter {
  page: number;
  size: number;
  sort: string;
}

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
  sort,
}: {
  page: number;
  size: number;
  sort: string;
}) => {
  return useSuspenseQuery({
    queryKey: suggestionKeys.list({ page, size, sort }),
    queryFn: () => SuggestionGet({ page, size, sort }),
  });
};

export const useSuggestionDetailQuery = (
  postId: string
): UseSuspenseQueryResult<SuggestionDetail> => {
  return useSuspenseQuery<SuggestionDetail>({
    queryKey: suggestionKeys.detail(postId),
    queryFn: () => SuggestionGetDetail(postId),
  });
};
