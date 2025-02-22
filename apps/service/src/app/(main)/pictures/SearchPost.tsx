"use client";
import React, { useState } from 'react'
import { Image } from "lucide-react";
import BoardListTitle from '../board/components/BoardListTitle'
import { POST_TYPE } from '@/src/constant/board'
import ErrorBoundaryWrapper from '../components/ErrorBoundaryWrapper';
import Post from './Post';
import { useQueryParams } from '../components/useQueryParams';
export default function SearchPost() {
  const { currentPage, searchQuery: initialSearchQuery, sortOption: initialSortOption } = useQueryParams();
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [sortOption, setSortOption] = useState(initialSortOption);

  return (
    <>
      <BoardListTitle 
      title={POST_TYPE.PICTURES}
      TitleImage={<Image size={20}/> }
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      sortOption={sortOption}
      setSortOption={setSortOption}
      defaultHref="/pictures"
      />
      <ErrorBoundaryWrapper>
        <Post postType={POST_TYPE.PICTURES} page={currentPage} size={8} sort={sortOption} />
      </ErrorBoundaryWrapper>   
      </>
      );
  
}
