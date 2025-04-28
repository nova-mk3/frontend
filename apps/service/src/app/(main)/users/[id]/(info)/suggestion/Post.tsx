import { PageNation } from "@/src/app/(main)/components/PageNation";
import SuggestionList from "@/src/app/(main)/suggestion/components/SuggestionList";
import SuggestionListItem, {
  SuggestionItem,
} from "@/src/app/(main)/suggestion/components/SuggestionListItem";
import { BOARD_SIZE } from "@/src/constant/board";
import React, { Suspense } from "react";

export const suggestionDummyData: SuggestionItem[] = [
  {
    adminRead: true,
    answered: true,
    author: true,
    createdTime: "2025-04-28T12:00:00Z",
    modifiedTime: "2025-04-28T13:00:00Z",
    private: false,
    title:
      "사이트 이용 중 오류가 발생했어요asdasdasdasdasdasdasdasdaasdasdasdasdasdasdasdasads",
    className: "error-report",
    index: "0",
    id: "suggestion-1",
    authorName: "홍길동",
  },
  {
    adminRead: false,
    answered: false,
    author: true,
    createdTime: "2025-04-27T10:30:00Z",
    modifiedTime: "2025-04-27T10:30:00Z",
    private: true,
    title: "개인정보 관련 문의드립니다",
    className: "privacy-inquiry",
    index: "1",
    id: "suggestion-2",
    authorName: "김철수",
  },
  {
    adminRead: true,
    answered: false,
    author: false,
    createdTime: "2025-04-26T09:15:00Z",
    modifiedTime: "2025-04-26T09:45:00Z",
    private: false,
    title: "새로운 기능 제안을 하고 싶습니다",
    className: "feature-request",
    index: "2",
    id: "suggestion-3",
    authorName: "이영희",
  },
];

export default function Post() {
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-background02 px-3 py-2">
        작성한 건의목록을 아래에서 확인하세요!
      </div>
      <div className="flex flex-col gap-2 min-h-[700px] mt-5">
        {suggestionDummyData.map((item) => (
          <SuggestionListItem
            key={item.id}
            id={item.id}
            index={item.id}
            title={item.title}
            adminRead={item.adminRead}
            answered={item.answered}
            author={item.author}
            createdTime={item.createdTime}
            modifiedTime={item.modifiedTime}
            private={item.private}
            authorName={item.authorName}
          />
        ))}
      </div>
      <Suspense fallback={<div className="h-[36px]"></div>}>
        <PageNation size={BOARD_SIZE} totalPage={2} className="my-4" />
      </Suspense>
    </div>
  );
}
