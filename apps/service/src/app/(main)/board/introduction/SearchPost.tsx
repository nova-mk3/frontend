"use client";
import React, { useState } from 'react'
import {  Hand  } from "lucide-react";
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
      title={POST_TYPE.INTRODUCTION}
      TitleImage={<Hand size={20}/> }
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      sortOption={sortOption}
      setSortOption={setSortOption}
      defaultHref="/board"
      />
      <ErrorBoundaryWrapper>
        <Post postType={POST_TYPE.INTRODUCTION} page={currentPage} size={BOARD_SIZE} sort={sortOption} />
      </ErrorBoundaryWrapper>
      </>
      );
  
}
