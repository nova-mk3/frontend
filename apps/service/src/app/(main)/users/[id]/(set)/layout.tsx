import React from "react";
import SubNavigation from "./components/SubNavigation";

import { getMemberId } from "@/src/api/user/server";

export default async function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  // 자기자신이 아니면 설정에 들어가는것조차 하면 안됌
  const { id } = await params;
  const memberId = await getMemberId();
  if (id !== memberId) return null;

  return (
    <div>
      <SubNavigation />
      {children}
    </div>
  );
}
