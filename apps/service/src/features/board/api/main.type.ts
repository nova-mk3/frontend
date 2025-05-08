import { IntegratedBoardParams } from "./integrated.type";

export type GetBoardsExcludeExamParams = Pick<
  IntegratedBoardParams,
  "page" | "size" | "sortBy" | "sortDirection"
>;
