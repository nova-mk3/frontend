"use client"

import React from 'react'

import { Folder, } from 'lucide-react';
import { useBoardIdStore } from '@/src/store/BoardId';
import { useArchiveDetailQuery} from '../../board/query/postqueries';
import { POST_TYPE } from '@/src/constant/board';
import Aside from '../../board/components/Aside';
import DetailPageSubTitle from '../../board/components/DetailPageSubTitle';
import { FileListLayout,FileList } from '../../components/File/ViewFileLayout';
import CommentTitle from '../../board/components/comments/CommentTitle';
import CommentForm from '../../board/components/comments/CommentForm';
import ErrorBoundaryWrapper from '../../components/ErrorBoundaryWrapper';
import CommentList from '../../board/components/comments/CommentList';
import DetailPageContent from '../../board/components/DetailPageContent';
import DetailPageTitle from '../../board/components/DetailPageTitle';



interface PostDetailProps{
    postId: string;
}
  
export default  function PostDetail({postId} : PostDetailProps) {

  console.log(postId);
  const {CLUB_ARCHIVE} = useBoardIdStore();
  const { data } = useArchiveDetailQuery(postId,CLUB_ARCHIVE);

  console.log(data);
  //
  return (
    <div className="flex flex-col t-m w-full mx-auto">
      <DetailPageTitle title={POST_TYPE.EXAM_ARCHIVE} TitleImage={ 
        <Folder size={20} />}
      />
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
      postType={POST_TYPE.EXAM_ARCHIVE} 
      boardId={CLUB_ARCHIVE}
      likeCount={data.likeCount}
      liked={data.liked}
      defaultHref='/exam_archive'
      />
      <FileListLayout>
        <FileList files={data.files}/>
      </FileListLayout>
      <DetailPageContent content={data.content}/>
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
