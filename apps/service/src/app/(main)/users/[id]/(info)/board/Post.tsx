import BoardListItem, {
  BoardListItemType,
} from "@/src/app/(main)/board/components/BoardListItem";
import { PageNation } from "@/src/app/(main)/components/PageNation";
import { BOARD_SIZE } from "@/src/constant/board";
import React, { Suspense } from "react";

export const boardListDummyData: BoardListItemType[] = [
  {
    className: "notice",
    id: "board-1",
    authorName: "홍길동",
    authorProfilePhoto: "https://via.placeholder.com/40", // 더미 이미지 링크
    title: "공지사항: 새로운 업데이트 안내",
    content:
      "이번 업데이트에서는 다양한 기능이 추가되었습니다. 자세한 내용은 공지사항을 참고해주세요.",
    type: "공지사항",
    createdTime: "2025-04-27T09:00:00Z",
    modifiedTime: "2025-04-27T10:00:00Z",
    likeCount: 12,
    commentCount: 5,
    viewCount: 200,
    href: "/board/1",
    ishome: true,
  },
  {
    className: "question",
    id: "board-2",
    authorName: "김철수",
    authorProfilePhoto: "https://via.placeholder.com/40",
    title: "질문: 로그인 오류가 발생합니다",
    content:
      "로그인 시 인증 에러가 발생하는데, 혹시 같은 문제를 겪으신 분 있으신가요?",
    type: "질문",
    createdTime: "2025-04-26T15:30:00Z",
    modifiedTime: "2025-04-26T16:00:00Z",
    likeCount: 4,
    commentCount: 2,
    viewCount: 85,
    href: "/board/2",
    ishome: false,
  },
  {
    className: "discussion",
    id: "board-3",
    authorName: "이영희",
    authorProfilePhoto: "https://via.placeholder.com/40",
    title: "자유토론: 개발할 때 사용하는 툴 추천해주세요",
    content:
      "개발하면서 사용하는 에디터나 생산성 툴 추천받습니다! 다들 뭐 쓰시나요?",
    type: "자유토론",
    createdTime: "2025-04-25T11:45:00Z",
    modifiedTime: "2025-04-25T12:00:00Z",
    likeCount: 25,
    commentCount: 10,
    viewCount: 340,
    href: "/board/3",
    ishome: true,
  },
];

export default function Post() {
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-background02 px-3 py-2">
        작성한 게시글을 아래에서 확인하세요!
      </div>
      <div className="flex flex-col gap-2 min-h-[700px] mt-5">
        {boardListDummyData.map((post) => (
          <BoardListItem
            key={post.id}
            id={post.id}
            authorName={post.authorName}
            authorProfilePhoto={post.authorProfilePhoto}
            title={post.title}
            content={post.content}
            type={post.type}
            createdTime={post.createdTime}
            modifiedTime={post.modifiedTime}
            likeCount={post.likeCount}
            commentCount={post.commentCount}
            viewCount={post.viewCount}
            href={`/board/${post.type.toLowerCase()}/${post.id}`}
            ishome={false}
          />
        ))}
      </div>
      <Suspense fallback={<div className="h-[36px]"></div>}>
        <PageNation size={BOARD_SIZE} totalPage={2} className="my-4" />
      </Suspense>
    </div>
  );
}
