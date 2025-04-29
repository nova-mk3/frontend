"use client";
import React from "react";
import AlarmList from "./AlarmList";
import { AlarmListItemProps } from "./AlarmListItem";

export const dummyAlarms: AlarmListItemProps[] = [
  {
    id: "1",
    isRead: false,
    message: "홍길동님이 회원님의 게시글에 댓글을 남겼습니다.",
    createAt: "1일 전",
  },
  {
    id: "2",
    isRead: true,
    message: "새로운 팔로워가 생겼습니다.",
    createAt: "2일 전",
  },
  {
    id: "3",
    isRead: false,
    message: "공지사항이 등록되었습니다. 확인해보세요.",
    createAt: "3일 전",
  },
  {
    id: "4",
    isRead: true,
    message: "비밀번호 변경이 완료되었습니다.",
    createAt: "5일 전",
  },
  {
    id: "5",
    isRead: false,
    message: "이벤트에 당첨되셨습니다! 자세히 확인하세요.",
    createAt: "1주 전",
  },
  {
    id: "6",
    isRead: true,
    message: "프로필 사진이 변경되었습니다.",
    createAt: "2주 전",
  },
  {
    id: "7",
    isRead: false,
    message: "새로운 댓글이 달렸습니다.",
    createAt: "3주 전",
  },
  {
    id: "8",
    isRead: true,
    message: "1개월 동안 활동이 없었습니다. 다시 돌아오세요!",
    createAt: "1개월 전",
  },
  {
    id: "9",
    isRead: false,
    message: "보안 알림: 로그인 시도가 감지되었습니다.",
    createAt: "6개월 전",
  },
  {
    id: "10",
    isRead: true,
    message: "회원 가입 1주년을 축하드립니다!",
    createAt: "1년 전",
  },
];

export default function page() {
  return (
    <div>
      <div className="bg-text02 px-3 py-2 max-w-screen-xl mobile:py-5">
        <div className="text-xl text-white">알림</div>
      </div>

      {/* 본문 */}
      <section className="min-h-[700px] px-3 py-5">
        <div className="flex flex-row bg-background02 py-2 px-2">
          <div className="flex flex-row gap-1">
            읽지 않은 알림 <p className="text-primary !font-bold">0</p>개
          </div>
          <div className="ml-auto text-sm text-gray-500 cursor-pointer">
            모두 읽기
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-5">
          <AlarmList content={dummyAlarms} />
        </div>
      </section>
      <div
        className="bg-primary text-white rounded-md px-2 py-3 flex items-center justify-center cursor-pointer"
        onClick={() => {
          alert("준비중입니다.");
        }}
      >
        {" "}
        알림 더보기
      </div>
    </div>
  );
}
