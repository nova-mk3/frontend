import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostComment } from "../../api/comment.api";
import { PostCommentRequest } from "../../api/comment.type";
import { commentsKeys } from "../../query/queryKeys";
import { postKeys } from "@/src/features/board/query/queryKey";

export const useCreateReplyMutation = ({
  postId,
  setValue,
}: {
  postId: string;
  setValue: (v: string) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, content, parentCommentId }: PostCommentRequest) =>
      PostComment({ postId, content, parentCommentId }),

    onSuccess: (data: any) => {
      setValue("");
      queryClient.invalidateQueries({
        queryKey: commentsKeys.list(postId),
        refetchType: "all",
      });
      queryClient.setQueryData(postKeys.detail(postId), (previous: any) => ({
        ...previous,
        commentCount: previous.commentCount + 1,
      }));
    },

    onError: (error: any) => {
      alert(error.message);
    },
  });
};
