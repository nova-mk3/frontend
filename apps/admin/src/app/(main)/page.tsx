// Dashboard page
// TODO : 대시보드 창의 내용들이 확정되면 넣을것
import React from "react";
import Logo from "@/public/image/Logo.svg";

export default function Dashboard() {
  return (
    <div className="text-blue-500 mobile:bg-blue-500 font-pretendard">
      Welcome to admin! dashboard 로 만들것
      <Logo width={100} fill="#123123" />
    </div>
  );
}
