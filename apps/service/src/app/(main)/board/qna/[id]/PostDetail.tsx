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
import { ChevronLeft, MessageSquare, MessageSquareMore } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@nova/ui/components/ui/separator';
import { Button } from '@nova/ui/components/ui/button';



interface PostDetailProps{
    postId: string;
}
  
export default  function PostDetail({postId} : PostDetailProps) {

  const {INTEGRATED} = useBoardIdStore();
  const { data } = usePostDetailQuery(postId,INTEGRATED);


  return (
    <div className="flex flex-col t-m w-full mx-auto">
      {/* <DetailPageTitle title={POST_TYPE.QNA} TitleImage={ <MessageSquareMore size={20} />} defaultHref='/board'/> */}
       <div className="border-y bg-background01">
              <div className="w-[80%] mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Link
                      href="/suggestion"
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span className="font-medium">Q&A 목록</span>
                    </Link>
                    <Separator orientation="vertical" className="h-4 mx-2" />
                    <div className="flex items-center gap-2">
                      <MessageSquareMore className="w-4 h-4" />
                      <span className="text-sm text-muted-foreground">질문 #{postId}</span>
                    </div>
                  </div>
                  <Button variant="outline">
                    <Link href="/suggestion/newpost">작성하기</Link>
                  </Button>
                </div>
              </div>
            </div>
      <div className="flex flex-row gap-[50px]">
      <Aside count={data.likeCount} liked={data.liked} postId={postId}/>
      <div className="flex flex-col gap-6 mx-auto flex-1">

        {/* 게시판 내용 */}
      <DetailPageSubTitle 
      title={data.title} 
      writer={data.authorName} 
      date={data.createdTime} 
      viewCount={data.viewCount} 
      postId={postId} 
      postType={POST_TYPE.QNA} 
      boardId={INTEGRATED}
      likeCount={data.likeCount}
      liked={data.liked}
       defaultHref='/board'
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
