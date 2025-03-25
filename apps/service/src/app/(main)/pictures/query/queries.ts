import { useSuspenseQuery } from "@tanstack/react-query";
import { postKeys } from "../../board/query/postqueries";
import { PictureGetDetail } from "@/src/api/board/picture";
import { PictureDetail } from "../[id]/PostDetail";

export const usePictureDetailQuery = ({
  postId,
  boardId,
}: {
  postId: string;
  boardId: string;
}) => {
  return useSuspenseQuery<PictureDetail>({
    queryKey: postKeys.detail(postId),
    queryFn: () => PictureGetDetail({ boardId, postId }),
  });
};
