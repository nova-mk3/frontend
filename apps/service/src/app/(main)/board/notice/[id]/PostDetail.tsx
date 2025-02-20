"use client"

import React from 'react'
import Aside from '../../components/Aside';
import { FileListLayout,FileList } from '../../../components/File/ViewFileLayout';

import Content from '../../../archive/[id]/components/Content';
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
    id: string;
}
  
export default  function PostDetail({id} : PostDetailProps) {

  const {INTEGRATED} = useBoardIdStore();

  const { data } = usePostDetailQuery(id,INTEGRATED);
  const queryClient= useQueryClient();

  // queryClient.invalidateQueries({
  //                   queryKey: postKeys.listmain(),
  //                   refetchType: 'inactive',
  //                 });
                  
  //                 queryClient.invalidateQueries({
  //                   queryKey: postKeys.typelists(POST_TYPE.NOTICE),
  //                   refetchType: 'inactive',
  // });

  console.log(data);

  return (
    <div className="flex flex-col t-m w-full mx-auto">
      <DetailPageTitle title={POST_TYPE.NOTICE} TitleImage={ <Pin size={20} />}/>
      <div className="flex flex-row gap-[50px]">
      <Aside count={data.likeCount} liked={data.liked} postId={id}/>
      <div className="flex flex-col gap-[20px] mx-auto flex-1">

        {/* 게시판 내용 */}
      <DetailPageSubTitle 
      title={data.title} 
      writer={data.authorName} 
      date={data.createdTime} 
      viewCount={data.viewCount} 
      postId={id} 
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
      <CommentForm postId={id as string}/>
          <ErrorBoundaryWrapper>
          <CommentList postId={id as string}/>
      </ErrorBoundaryWrapper>
      
      </div>


    
      </div>
    </div>
  );
}
