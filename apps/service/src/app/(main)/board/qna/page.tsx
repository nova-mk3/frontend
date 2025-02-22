"use client";
import Post from "./Post";
import { BOARD_SIZE, POST_TYPE } from "@/src/constant/board";
import {   useSearchParams } from "next/navigation";
import BoardListTitle from "../components/BoardListTitle";
import { MessageSquareMore } from "lucide-react";

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
      title={POST_TYPE.QNA}
      TitleImage={<MessageSquareMore size={20}/> }
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      sortOption={sortOption}
      setSortOption={setSortOption}
      defaultHref="/board"
      />
      <ErrorBoundaryWrapper>
        <Post postType={POST_TYPE.QNA} page={currentPage} size={BOARD_SIZE} sort={sortOption} />
      </ErrorBoundaryWrapper>
    </>
  );
}
