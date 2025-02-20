"use clinet"
import React from 'react'
import { EmojiCirCleButton } from './Aside'
import HeartIcon from "@/public/image/Heart.svg";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LikeAPI, UnLikeAPI } from '@/src/api/board/like';
import { postKeys } from '../query/postqueries';


interface LikeProps{
    liked : boolean;
    postId : string;
}
export default function DesktopLike({liked,postId} : LikeProps) {
    const queryClient= useQueryClient();



    const useLikeMutation =  useMutation({
        mutationFn: ({postId} : {postId : string}) => LikeAPI(postId),
        onSuccess: (data : any) => {

            queryClient.setQueryData(
                    postKeys.detail(postId),
                    (previous: any) => {
            
                     return {
                      ...previous,
                       likeCount : previous.likeCount +1,
                       liked: !previous.liked
                       }
                    }
        )
        },
        onError: (error) => {
          alert(error.message);
        },
      });
      const useUnLikeMutation =  useMutation({
        mutationFn: ({postId} : {postId : string}) => UnLikeAPI(postId),
        onSuccess: (data : any) => {
            queryClient.setQueryData(
                postKeys.detail(postId),
                (previous: any) => {
        
                 return {
                  ...previous,
                  likeCount : previous.likeCount -1,
                   liked: !previous.liked
                   }
                }
    )
        },
        onError: (error) => {
          alert(error.message);
        },
      });
    
    const onLike= ()=>{
        useLikeMutation.mutate({postId});
    }
    const onUnLike= ()=>{
        useUnLikeMutation.mutate({postId});
    }

   if(liked === true){
    return (
        <EmojiCirCleButton onClick={()=> onUnLike()} className='bg-primary border-none hover:opacity-90'><HeartIcon width={24} className="text-white"/></EmojiCirCleButton>
      )
   }
   else{
    return (
        <EmojiCirCleButton onClick={()=>onLike()}><HeartIcon width={24}/></EmojiCirCleButton>
      )
   }

}
