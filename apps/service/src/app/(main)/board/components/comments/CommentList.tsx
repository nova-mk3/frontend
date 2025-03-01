"use client"
import React from 'react'
import CommentListItem, { CommentItemProps } from './CommentListItem'
import { useCommentsListQuery } from '../../query/comments'


interface CommentListProps{
    postId: string;
  }
export default function CommentList({postId} : CommentListProps) {
    const {data} = useCommentsListQuery(postId);

    
  return (
    <>
            {
            data.map((item: CommentItemProps) => (
                <CommentListItem
                key={item.id}
                id={item.id}
                authorName={item.authorName}
                authorProfilePhoto={item.authorProfilePhoto}
                children={item.children}
                content={item.content}
                modifiedTime={item.modifiedTime}
                createdTime={item.createdTime}
                postId={postId}
                />
            ))
            }
    
    </>
  )
}
