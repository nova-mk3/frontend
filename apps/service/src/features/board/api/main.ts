import { throwErrorMessage } from "@/src/shared/utils/throwError";
import { GetBoardsExcludeExamParams } from "./main.type";
import { api } from "@/src/shared/api/core";

/**
 * 자료 게시판을 제외한 모든 게시글 조회
 */
export async function GetBoardsExcludeExam({
  size,
  page,
  sortDirection,
  sortBy,
}: GetBoardsExcludeExamParams) {
  try {
    const response = await api.get(
      `/posts/across-boards?sortBy=${sortBy}&sortDirection=${sortDirection}&page=${page}&size=${size}`
    );
    return response.data.data;
  } catch (error: any) {
    throwErrorMessage(error);
  }
}
