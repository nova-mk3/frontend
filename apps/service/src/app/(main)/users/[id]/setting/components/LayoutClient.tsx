"use client";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

import SubNavigation from "./SubNavigation";

interface Props {
  id: string;
  children: React.ReactNode;
}
export default function LayoutClient({ id, children }: Props) {
  const queryClient = useQueryClient();

  const memberProfile = queryClient.getQueryData(["memberProfile"]) as any;
  console.log(memberProfile);

  if (!memberProfile) return <>{children}</>;
  if (memberProfile.memberId !== id) return <>{children}</>;

  return (
    <div>
      <SubNavigation />
      {children}
    </div>
  );
}
