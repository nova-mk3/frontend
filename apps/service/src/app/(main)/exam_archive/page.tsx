"use client";
import Post from "./Post";
import { BOARD_SIZE, POST_TYPE } from "@/src/constant/board";
import {   useSearchParams } from "next/navigation";
import {  Folder  } from "lucide-react";
import {  useState } from "react";
import ErrorBoundaryWrapper from "../components/ErrorBoundaryWrapper";
import ArchiveListTitle from "./components/ArchiveListTitle";
export default function Page() {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "");
  const [sortOption, setSortOption] = useState(searchParams.get("sort") || "asc");


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
