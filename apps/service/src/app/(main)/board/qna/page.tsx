"use client";
import Post from "./Post";

import { BOARD_SIZE, POST_TYPE } from "@/src/constant/board";
import {  useRouter, useSearchParams } from "next/navigation";
import BoardListTitle from "../components/BoardListTitle";
import { MessageSquareMore } from "lucide-react";

import ErrorBoundaryWrapper from "../../components/ErrorBoundaryWrapper";
import { useEffect, useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "");
  const [sortOption, setSortOption] = useState(searchParams.get("sort") || "asc");


  return (
    <>
      <BoardListTitle 
      title="Q&A" 
      TitleImage={<MessageSquareMore size={20}/> }
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      sortOption={sortOption}
      setSortOption={setSortOption}
      />
      <ErrorBoundaryWrapper>
        <Post postType={POST_TYPE.QNA} page={currentPage} size={BOARD_SIZE} sort={sortOption} />
      </ErrorBoundaryWrapper>
    </>
  );
}
