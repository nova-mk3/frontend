"use client"

import React from 'react'
import Aside from '../../../archive/[id]/components/Aside';
import { FileListLayout,FileList } from '../../../archive/[id]/components/FileListLayout';

import Content from '../../../archive/[id]/components/Content';
import DetailPageTitle from '../../components/DetailPageTitle';
import { MessageSquareMore } from 'lucide-react';
import { useBoardIdStore } from '@/src/store/BoardId';
import { useSuspenseQuery } from '@tanstack/react-query';
import { IntegratedBoardGetDetail } from '@/src/api/board/integrated';
import CommentTitle from '../../components/comments/CommentTitle';
import { usePostDetailQuery } from '../../query/postqueries';
import CommentForm from '../../components/comments/CommentForm';
import ErrorBoundaryWrapper from '../../../components/ErrorBoundaryWrapper';
import CommentList from '../../components/comments/CommentList';
import { POST_TYPE } from '@/src/constant/board';
import DetailPageSubTitle from '../../components/DetailPageSubTitle';


interface PostDetailProps{
    id: string;
}
  
export default  function PostDetail({id} : PostDetailProps) {

  const {INTEGRATED} = useBoardIdStore();

  const { data } = usePostDetailQuery(id,INTEGRATED);
  console.log(data);
  return (
    <div className="flex flex-col t-m w-full mx-auto">
      <DetailPageTitle title='Q&A' TitleImage={ <MessageSquareMore size={20} />}/>
      <div className="flex flex-row gap-[50px]">
      <Aside count={data.data.likeCount}/>
      <div className="flex flex-col gap-[20px] mx-auto flex-1">

        {/* 게시판 내용 */}
      <DetailPageSubTitle title={data.data.title} writer={data.data.authorName} date={data.data.createdTime} viewCount={data.data.viewCount} postId={id} postType={POST_TYPE.NOTICE}/>
      <FileListLayout>
        <FileList files={data.data.files}/>
      </FileListLayout>
      <Content content={data.data.content}/>
      <CommentTitle
      title='전체 댓글'
      count={data.data.commentCount}
      />
      {/* 댓글 부분 */}
      <CommentForm postId={id as string}/>
          <ErrorBoundaryWrapper>
          <CommentList postId={id as string}/>
      </ErrorBoundaryWrapper>
      
      </div>


    
      </div>
    </div>
  );
}
