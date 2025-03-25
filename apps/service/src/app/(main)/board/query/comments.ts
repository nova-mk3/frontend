import { useSuspenseQuery } from "@tanstack/react-query";
import { CommentsListQueryOptions } from "./options";

export const commentsKeys = {
  all: ["comments"] as const,
  list: (postId: string) => [...commentsKeys.all, "list", postId] as const,
};

export const useCommentsListQuery = (postId: string) => {
  return useSuspenseQuery(CommentsListQueryOptions(postId));
};
