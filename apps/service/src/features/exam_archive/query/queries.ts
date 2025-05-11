import { useQuery } from "@tanstack/react-query";
import { postKeys } from "../../board/query/queryKey";
import { GetArchive } from "../api/exam_archive";
import { GetIntegratedBoardParams } from "../../board/api/integrated.type";

export const useArchiveDetailQuery = ({
  postId,
  boardId,
}: GetIntegratedBoardParams) => {
  return useQuery({
    queryKey: postKeys.detail(postId),
    queryFn: () => GetArchive({ boardId, postId }),
  });
};
