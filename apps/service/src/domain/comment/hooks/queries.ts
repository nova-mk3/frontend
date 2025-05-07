import { useQuery } from "@tanstack/react-query";
import { CommentsListQueryOptions } from "../query/option";

export const useCommentsListQuery = (postId: string) => {
  return useQuery(CommentsListQueryOptions(postId));
};
