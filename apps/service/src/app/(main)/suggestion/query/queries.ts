import { SuggestionGet, SuggestionGetDetail } from "@/src/api/board/suggestion";
import { useSuspenseQuery } from "@tanstack/react-query";

interface SearchFilter{
  page: number;
  size: number;
  sort: string;
}

export const suggestionKeys = {
    all: ['suggestion',] as const,
    lists : () => [...suggestionKeys.all, 'list'] as const,
    list : (filters : SearchFilter) =>[...suggestionKeys.all, filters] as const,  //전체보기
    details: (postId : string) => [...suggestionKeys.lists(), 'detail'] as const,  //상세보기
    detail: (postId : string) => [...suggestionKeys.lists(), 'detail', postId] as const,  //상세보기
}


export const useSuggestionListQuery = ({page,size,sort} : {
    page : number
    size : number
    sort : string

}) => {
    return useSuspenseQuery({
      queryKey: suggestionKeys.list({page,size,sort}), 
      queryFn: () => SuggestionGet({ page,size,sort }),
    });
};


export const useSuggestionDetailQuery = (postId : string) => {
  return useSuspenseQuery({
    queryKey: suggestionKeys.detail(postId), 
    queryFn: () => SuggestionGetDetail(postId),
  });
};