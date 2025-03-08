"use client";
import React from "react";
import Post from "./Post";
import { BOARD_SIZE, POST_TYPE } from "@/src/constant/board";
import { Folder } from "lucide-react";
import { useState } from "react";
import ErrorBoundaryWrapper from "../components/ErrorBoundaryWrapper";
import { useQueryParams } from "../components/useQueryParams";
import Title from "./components/Title";
export default function SearchPost() {
  const {
    currentPage,
    searchQuery: initialSearchQuery,
    sortOption: initialSortOption,
  } = useQueryParams();
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [sortOption, setSortOption] = useState(initialSortOption);

  return (
    <div className="w-[80%] mx-auto">
      {/* <ArchiveListTitle
      title={POST_TYPE.EXAM_ARCHIVE}
      TitleImage={<Folder size={20}/> }
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      sortOption={sortOption}
      setSortOption={setSortOption}
      /> */}
      {/* 건의함 검색 추가 예정 */}
      <Title title="건의함" className="mt-5" />
      <ErrorBoundaryWrapper>
        <Post page={currentPage} size={10} sort={sortOption} />
      </ErrorBoundaryWrapper>
    </div>
  );
}
