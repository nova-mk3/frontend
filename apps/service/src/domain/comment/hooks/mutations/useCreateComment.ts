import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostComment } from "../../api/comment.api";
import { PostCommentRequest } from "../../api/comment.type";
import { postKeys } from "@/src/app/(main)/board/query/postqueries";
import { commentsKeys } from "../../query/queryKeys";

export const useCreateCommentMutation = ({
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

      queryClient.setQueryData(postKeys.detail(postId), (previous: any) => {
        return {
          ...previous,
          commentCount: previous.commentCount + 1,
        };
      });
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};
