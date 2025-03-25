import { queryOptions } from "@tanstack/react-query";
import { postKeys } from "./postqueries";
import {
  BoardLatestList,
  IntegratedBoardGetDetail,
} from "@/src/api/board/integrated";
import { CommentsGetList } from "@/src/api/board/comments";
import { commentsKeys } from "./comments";

export const postDetailQueryOptions = (postId: string, boardId: string) => {
  return queryOptions({
    queryKey: postKeys.detail(postId),
    queryFn: () => IntegratedBoardGetDetail({ boardId, postId }),
  });
};

export const postLatestQueryOptions = (boardId: string) => {
  return queryOptions({
    queryKey: postKeys.latest(boardId),
    queryFn: () => BoardLatestList({ boardId }),
  });
};

export const CommentsListQueryOptions = (postId: string) => {
  return queryOptions({
    queryKey: commentsKeys.list(postId),
    queryFn: () => CommentsGetList({ postId }),
  });
};
