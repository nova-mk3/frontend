"use client";
import Post from "./Post";
import { BOARD_SIZE, POST_TYPE } from "@/src/constant/board";
import {   useSearchParams } from "next/navigation";
import BoardListTitle from "../components/BoardListTitle";
import {  Pin } from "lucide-react";

import ErrorBoundaryWrapper from "../../components/ErrorBoundaryWrapper";
import {  useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "");
  const [sortOption, setSortOption] = useState(searchParams.get("sort") || "asc");


  return (
    <>
      <BoardListTitle 
      title={POST_TYPE.FREE}
      TitleImage={<Pin size={20}/> }
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      sortOption={sortOption}
      setSortOption={setSortOption}
      />
      <ErrorBoundaryWrapper>
        <Post postType={POST_TYPE.FREE} page={currentPage} size={BOARD_SIZE} sort={sortOption} />
      </ErrorBoundaryWrapper>
    </>
  );
}
