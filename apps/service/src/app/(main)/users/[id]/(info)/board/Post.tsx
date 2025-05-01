"use client";

import PostList from "./PostList";

export default function Post() {
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-background02 px-3 py-2">
        작성한 게시글을 아래에서 확인하세요!
      </div>
      <PostList />
    </div>
  );
}
