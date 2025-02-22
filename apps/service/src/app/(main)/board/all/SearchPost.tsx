"use client";
import React, { useState } from 'react'
import {  Layers } from "lucide-react";
import { BOARD_SIZE, POST_TYPE } from '@/src/constant/board'
import Post from './Post';
import BoardListTitle from '../components/BoardListTitle';
import ErrorBoundaryWrapper from '../../components/ErrorBoundaryWrapper';
import { useQueryParams } from '../../components/useQueryParams';

export default function SearchPost() {
  const { currentPage, searchQuery: initialSearchQuery, sortOption: initialSortOption } = useQueryParams();
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [sortOption, setSortOption] = useState(initialSortOption);

  return (
    <>
      <BoardListTitle 
      title={POST_TYPE.ALL} 
      TitleImage={<Layers size={24}/> }
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      sortOption={sortOption}
      setSortOption={setSortOption}
      />
      <ErrorBoundaryWrapper>
        <Post  page={currentPage} size={BOARD_SIZE} sort={sortOption} />
      </ErrorBoundaryWrapper>
      </>
      );
  
}
