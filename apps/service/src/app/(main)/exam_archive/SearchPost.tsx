"use client";
import React from 'react'
import Post from "./Post";
import { BOARD_SIZE, POST_TYPE } from "@/src/constant/board";
import {  Folder  } from "lucide-react";
import {  useState } from "react";
import ErrorBoundaryWrapper from "../components/ErrorBoundaryWrapper";
import ArchiveListTitle from "./components/ArchiveListTitle";
import { useQueryParams } from "../components/useQueryParams";
export default function SearchPost() {
  const { currentPage, searchQuery: initialSearchQuery, sortOption: initialSortOption } = useQueryParams();
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [sortOption, setSortOption] = useState(initialSortOption);

  return (
    <>
      <ArchiveListTitle
      title={POST_TYPE.EXAM_ARCHIVE}
      TitleImage={<Folder size={20}/> }
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      sortOption={sortOption}
      setSortOption={setSortOption}
      />
      <ErrorBoundaryWrapper>
        <Post postType={POST_TYPE.EXAM_ARCHIVE} page={currentPage} size={BOARD_SIZE} sort={sortOption} />
      </ErrorBoundaryWrapper>
    </>
  );
}
