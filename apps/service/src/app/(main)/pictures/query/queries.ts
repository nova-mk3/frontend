import { useQuery } from "@tanstack/react-query";
import { PictureGetDetail } from "@/src/api/board/picture";
import { PictureDetail } from "../[id]/PostDetail";
import { postKeys } from "@/src/features/board/query/queryKey";

export const usePictureDetailQuery = ({
  postId,
  boardId,
}: {
  postId: string;
  boardId: string;
}) => {
  return useQuery<PictureDetail>({
    queryKey: postKeys.detail(postId),
    queryFn: () => PictureGetDetail({ boardId, postId }),
  });
};
