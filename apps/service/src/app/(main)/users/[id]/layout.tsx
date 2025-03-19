import React from "react";
import Navigation from "./components/Navigation";
import { getMemberId } from "@/src/api/user/server";
export default async function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const memberId = await getMemberId();
  //다른사람 프로필을 볼때는 서브 네비게이션만
  if (id !== memberId) return <>{children}</>;
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
}
