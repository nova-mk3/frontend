import { queryOptions } from "@tanstack/react-query";
import { commentsKeys } from "./queryKeys";
import { GetComments } from "../api/comment.api";

export const CommentsListQueryOptions = (postId: string) => {
  return queryOptions({
    queryKey: commentsKeys.list(postId),
    queryFn: () => GetComments({ postId }),
  });
};
