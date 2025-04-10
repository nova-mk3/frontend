"use client";
import { BookOpen } from "lucide-react";

export default function UXResearchDashboard() {
  const insights = [
    "회원가입 UI 흐름 혼란 → 버튼 명확히",
    "모바일 접속 시 레이아웃 깨짐",
    "대시보드 진입 시 로딩시간 인지 부족",
  ];

  return (
    <div className="border-2 border-primary rounded-xl shadow-md p-6 w-full h-full bg-white flex flex-col justify-between">
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-black">
        <BookOpen className="text-primary" size={24} /> UX 리서치 요약
      </h2>
      <span className="text-2xl font-bold text-primary">임시내용입니다</span>

      <ul className="text-sm text-gray-700 list-disc ml-4 space-y-1">
        {insights.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  );
}
