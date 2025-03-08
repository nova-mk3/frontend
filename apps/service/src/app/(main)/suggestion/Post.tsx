"use client";

import React, { Suspense } from "react";
import { PageNation } from "../components/PageNation";
import { useSuggestionListQuery } from "./query/queries";
import SuggestionList from "./components/SuggestionList";

interface Props {
  page: number;
  size: number;
  sort: string;
}

export default function Post({ page, size, sort }: Props) {
  const { data } = useSuggestionListQuery({ page: page - 1, size, sort });
  return (
    <div>
      <SuggestionList content={data.content} />
      <Suspense fallback={<div className="h-[36px]"></div>}>
        <PageNation size={size} totalPage={data.totalPages} className="my-4" />
      </Suspense>
    </div>
  );
}
