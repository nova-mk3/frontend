"use client";
import React from "react";

import { Crown } from "lucide-react";
import Title from "./Title";
import ExecutiveList from "./ExecutiveList";

export default function ExecutivePage() {
  return (
    <div className="">
      <Title title="임원소개" TitleImage={<Crown size={24} />} />
      <ExecutiveList />
    </div>
  );
}
