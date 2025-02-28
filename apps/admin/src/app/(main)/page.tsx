"use client";

import React, { Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Authapi } from "@/src/api/core";

const POST_TYPE = {
  EXAM_ARCHIVE: "EXAM_ARCHIVE",
  FREE: "FREE",
  INTRODUCTION: "INTRODUCTION",
  NOTICE: "NOTICE",
  PICTURES: "PICTURES",
  QNA: "QNA",
  SUGGESTION: "SUGGESTION",
  ALL: "ALL",
} as const;

type PostType = typeof POST_TYPE[keyof typeof POST_TYPE];

interface Params {
  boardId: string;
}

// API 요청 함수
async function BoardLatestList({ boardId }: Params) {
  try {
    const response = await Authapi.get(`/nova/boards/${boardId}/posts/latest`);
    return response.data.data;
  } catch (error) {
    console.error("게시글 최신 목록 가져오기 실패:", error);
    throw error;
  }
}

// 별도의 Hook으로 분리
const usePostLatestListQuery = (boardId: string) => {
  return useSuspenseQuery({
    queryKey: ["posts", "list", "main", "latest", boardId],
    queryFn: () => BoardLatestList({ boardId }),
  });
};

// 데이터를 보여줄 컴포넌트
function PostList({ boardId }: { boardId: string }) {
  const { data } = usePostLatestListQuery(boardId);

  return (
    <div>
      <h2>게시글 최신 목록</h2>
      <ul>
        {/* {data.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))} */}
        {JSON.stringify(data)}
      </ul>
    </div>
  );
}

// 메인 컴포넌트
export default function Dashboard() {
  return (
    <div className="text-blue-500 mobile:bg-blue-500 font-pretendard">
      <h1>Welcome to admin! 대시보드로 만들 예정</h1>

      <Suspense fallback={<p>로딩 중...</p>}>
        <PostList boardId="2b49420a-f465-43ae-b7c0-ea75c6f9cf8b" />
      </Suspense>

      {/* POST_TYPE 객체 출력 예시 */}
      <h2>POST_TYPE 객체 출력</h2>
      <pre>{JSON.stringify(POST_TYPE, null, 2)}</pre>

      {/* POST_TYPE 배열 렌더링 예시 */}
      <h2>POST_TYPE 배열 출력</h2>
      <ul>
        {Object.values(POST_TYPE).map((type) => (
          <li key={type}>{type}</li>
        ))}
      </ul>
    </div>
  );
}
