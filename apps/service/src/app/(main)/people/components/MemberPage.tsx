"use client";
import React from "react";

import { Users } from "lucide-react";
import Title from "./Title";
import MemberList from "./MemberList";

export default function MemberPage() {
  return (
    <div className="flex flex-col gap-6">
      <Title title="동아리원 소개" TitleImage={<Users size={24} />} />
      <MemberList />
    </div>
  );
}
