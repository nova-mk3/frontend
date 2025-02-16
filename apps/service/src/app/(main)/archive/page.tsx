"use client";
import React, { useState, Suspense } from "react";
import Title from "./components/Title";
import ContentList from "./components/ContentList";
import { PageNation } from "./components/PageNation";

export default function page() {
  const size = 5;
  const [totalPage, setTotalPage] = useState(10);

  return (
    <div className="flex flex-col t-m w-[80%] mx-auto">
      <Title title="족보게시판"/>
      <ContentList />
      <Suspense>
        <PageNation size={size} totalPage={totalPage} className="my-4" />
      </Suspense>
    </div>  
  );
}
