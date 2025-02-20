"use client"

import React from 'react'
import Aside from '../../components/Aside';
import SubTitle from '../../../archive/[id]/components/SubTitle';
import { FileListLayout,FileList } from '../../../components/File/ViewFileLayout';
import CommentLayout from '../../../archive/[id]/components/CommentLayout';
import Content from '../../../archive/[id]/components/Content';
import DetailPageTitle from '../../components/DetailPageTitle';
import { MessageSquareMore } from 'lucide-react';
import { useBoardIdStore } from '@/src/store/BoardId';
import { useSuspenseQuery } from '@tanstack/react-query';
import { IntegratedBoardGetDetail } from '@/src/api/board/integrated';

interface PostDetailProps{
    id: string;
}
  
export default  function PostDetail({id} : PostDetailProps) {

  const {INTEGRATED} = useBoardIdStore();

  const { data, isLoading, error } = useSuspenseQuery({
      // 부모에서 prefetchQuery 할 때 썼던 키와 동일하게
      queryKey: ["QNA_Detail", { INTEGRATED, id }],
      queryFn: () => IntegratedBoardGetDetail({  boardId : INTEGRATED , postId : id},),
  });
  const response = data.data;
  
  return (
    <div className="flex flex-col t-m w-full mx-auto">
      <DetailPageTitle title='Q&A' TitleImage={ <MessageSquareMore size={20} />}/>
      <div className="flex flex-row gap-[50px]">
      <Aside count={response.likeCount}/>
      <div className="flex flex-col gap-[20px] mx-auto flex-1">
      <SubTitle title={response.title} writer={response.authorName} date={response.createdTime} viewCount={response.viewCount} postId={id}/>
      <FileListLayout>
        <FileList files={response.files}/>
      </FileListLayout>
      <Content content={response.content}/>
      <CommentLayout />
      </div>
      </div>
    </div>
  );
}
