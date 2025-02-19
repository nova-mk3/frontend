import { CommentsGetList } from "@/src/api/board/comments";
import { useSuspenseQuery } from "@tanstack/react-query";

export const commentsKeys = {
    all: ['comments',] as const,
    list: (postId : string) => [...commentsKeys.all, 'list',postId] as const,
}


export const useCommentsListQuery = (postId: string) => {
    return useSuspenseQuery({
      queryKey: commentsKeys.list(postId), 
      queryFn: () => CommentsGetList({postId }),
    });
};

