import React from "react";
import { usePostListQuery } from "../../board/query/postqueries";
import { INTEGRATED, POST_TYPE } from "@/src/constant/board";

interface Props {
  tab: string;
}
export default function PostList({ tab }: Props) {
  // 선택된 tab의 useUquery를 호출해야되는데

  const { data, isLoading } = usePostListQuery({
    postType: POST_TYPE.INTRODUCTION,
    page: 0,
    size: 7,
    keyword: "",
    searchType: "",
    sortBy: "createdTime",
    sortDirection: "desc",
    boardId: INTEGRATED,
  });

  console.log(data);
  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return <div>PostList</div>;
}
