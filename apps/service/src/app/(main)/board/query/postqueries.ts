/*
board에서 사용하는 react-query hooks 모음입니다
*/

import { BoardAllList, BoardLatestList, IntegratedBoardGet, IntegratedBoardGetDetail } from "@/src/api/board/integrated";
import { PostType } from "@/src/constant/board";
import { useSuspenseQuery } from "@tanstack/react-query";

export const postKeys = {
    all: ['posts',] as const,
    lists: (postType : PostType) => [...postKeys.all, 'list',postType] as const,
    // list: (filters: string, postType : PostType) => [...postKeys.lists(postType), { filters }] as const,
    details: () => [...postKeys.all, 'detail'] as const,
    detail: (postId: string) => [...postKeys.details(), postId] as const,
    latest : ['latest'] as const,
}



export const usePostDetailQuery = (postId: string, boardId: string) => {
    return useSuspenseQuery({
      queryKey: postKeys.detail(postId), 
      queryFn: () => IntegratedBoardGetDetail({ boardId, postId }),
    });
};


export const usePostListQuery = ({postType,page,size,sort,boardId} : {
    postType : PostType
    page : number
    size : number
    sort : string
    boardId : string
}) => {
    return useSuspenseQuery({
      queryKey: postKeys.lists(postType), 
      queryFn: () => IntegratedBoardGet({ postType,page,size,sort,boardId }),
    });
};

export const usePostAllListQuery = ({page,size,sort,boardId} : {
    page : number
    size : number
    sort : string
    boardId : string
}) => {
    return useSuspenseQuery({
      queryKey: postKeys.all, 
      queryFn: () => BoardAllList({ page,size,sort,boardId }),
    });
};

export const usePosLatestListQuery = ({boardId} : {
    boardId : string
}) => {
    return useSuspenseQuery({
      queryKey: postKeys.latest, 
      queryFn: () => BoardLatestList({ boardId }),
    });
};




