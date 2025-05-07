export const commentsKeys = {
  all: ["comments"] as const,
  list: (postId: string) => [...commentsKeys.all, "list", postId] as const,
};
