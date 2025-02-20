"use client"

import React from 'react'
import Aside from '../../components/Aside';
import { FileListLayout,FileList } from '../../../components/File/ViewFileLayout';

import Content from '../../components/DetailPageContent';
import DetailPageTitle from '../../components/DetailPageTitle';
import { useBoardIdStore } from '@/src/store/BoardId';

import CommentTitle from '../../components/comments/CommentTitle';
import { postKeys, usePostDetailQuery } from '../../query/postqueries';
import CommentForm from '../../components/comments/CommentForm';
import ErrorBoundaryWrapper from '../../../components/ErrorBoundaryWrapper';
import CommentList from '../../components/comments/CommentList';
import { POST_TYPE } from '@/src/constant/board';
import DetailPageSubTitle from '../../components/DetailPageSubTitle';
import { Pin } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';


interface PostDetailProps{
    postId: string;
}
  
export default  function PostDetail({postId} : PostDetailProps) {

  const {INTEGRATED} = useBoardIdStore();
  const { data } = usePostDetailQuery(postId,INTEGRATED);


  return (
    <div className="flex flex-col t-m w-full mx-auto">
      <DetailPageTitle title={POST_TYPE.NOTICE} TitleImage={ <Pin size={20} />}/>
      <div className="flex flex-row gap-[50px]">
      <Aside count={data.likeCount} liked={data.liked} postId={postId}/>
      <div className="flex flex-col gap-[20px] mx-auto flex-1">

        {/* 게시판 내용 */}
      <DetailPageSubTitle 
      title={data.title} 
      writer={data.authorName} 
      date={data.createdTime} 
      viewCount={data.viewCount} 
      postId={postId} 
      postType={POST_TYPE.NOTICE} 
      boardId={INTEGRATED}
      likeCount={data.likeCount}
      liked={data.liked}
      
      />
      <FileListLayout>
        <FileList files={data.files}/>
      </FileListLayout>
      <Content content={data.content}/>
      <CommentTitle
      title='전체 댓글'
      count={data.commentCount}
      />

      {/* 댓글 부분 */}
      <CommentForm postId={postId as string}/>
          <ErrorBoundaryWrapper>
          <CommentList postId={postId as string}/>
      </ErrorBoundaryWrapper>
      
      </div>
    
      </div>
    </div>
  );
}
