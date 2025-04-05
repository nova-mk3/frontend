import { queryOptions } from "@tanstack/react-query";
import { postKeys } from "./postqueries";
import {
  AcrossBoardParamType,
  BoardLatestList,
  getAcrossBoard,
  IntegratedBoardGet,
  IntegratedBoardGetDetail,
  Params,
} from "@/src/api/board/integrated";
import { CommentsGetList } from "@/src/api/board/comments";
import { commentsKeys } from "./comments";

export const postDetailQueryOptions = (postId: string, boardId: string) => {
  return queryOptions({
    queryKey: postKeys.detail(postId),
    queryFn: () => IntegratedBoardGetDetail({ boardId, postId }),
  });
};

export const postLatestQueryOptions = (boardId: string) => {
  return queryOptions({
    queryKey: postKeys.latest(boardId),
    queryFn: () => BoardLatestList({ boardId }),
  });
};

export const AcrossBoardQueryOptions = ({
  size,
  page,
  sortDirection,
  sortBy,
}: AcrossBoardParamType) => {
  return queryOptions({
    queryKey: postKeys.list({ size, page, sortDirection, sortBy, keyword: "" }),
    queryFn: () => getAcrossBoard({ size, page, sortDirection, sortBy }),
  });
};

export const postSearchQueryOptions = ({
  page,
  size,
  searchType,
  sortBy,
  sortDirection,
  keyword,
  postType,
  boardId,
}: Omit<Params, "postId">) => {
  return queryOptions({
    queryKey: postKeys.typelist(
      { page, size, searchType, sortBy, sortDirection, keyword },
      postType
    ),
    queryFn: () =>
      IntegratedBoardGet({
        postType,
        page,
        size,
        boardId,
        searchType,
        sortBy,
        sortDirection,
        keyword,
      }),
  });
};

export const CommentsListQueryOptions = (postId: string) => {
  return queryOptions({
    queryKey: commentsKeys.list(postId),
    queryFn: () => CommentsGetList({ postId }),
  });
};
