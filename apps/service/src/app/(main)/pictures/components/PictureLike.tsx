"use client";
import React, { useState } from "react";
import HeartIcon from "@/public/image/Heart.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LikeAPI, UnLikeAPI } from "@/src/api/board/like";
import { cn } from "@nova/ui/lib/utils";
import { postKeys } from "../../board/query/postqueries";
import { EmojiCirCleButton } from "../../board/components/Aside";

interface LikeProps {
  liked: boolean;
  postId: string;
}
export default function PictureLike({ liked, postId }: LikeProps) {
  const queryClient = useQueryClient();

  const [action, setAction] = useState(false);

  const useLikeMutation = useMutation({
    mutationFn: ({ postId }: { postId: string }) => LikeAPI(postId),
    onSuccess: (data: any) => {
      queryClient.setQueryData(postKeys.detail(postId), (previous: any) => {
        return {
          ...previous,
          likeCount: previous.likeCount + 1,
          liked: !previous.liked,
        };
      });
    },
    onError: (error) => {
      alert(error.message);
    },
  });
  const useUnLikeMutation = useMutation({
    mutationFn: ({ postId }: { postId: string }) => UnLikeAPI(postId),
    onSuccess: (data: any) => {
      queryClient.setQueryData(postKeys.detail(postId), (previous: any) => {
        return {
          ...previous,
          likeCount: previous.likeCount - 1,
          liked: !previous.liked,
        };
      });
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const onLike = () => {
    setAction(true);
    useLikeMutation.mutate({ postId });

    setTimeout(() => {
      setAction(false);
    }, 1000);
  };
  const onUnLike = () => {
    useUnLikeMutation.mutate({ postId });
    setAction(false);
  };

  if (liked === true) {
    return (
      <EmojiCirCleButton
        onClick={() => onUnLike()}
        data-state={action ? "open" : "closed"}
        className={cn(
          "bg-primary border-none hover:opacity-90 !duration-1000 data-[state=open]:animate-in   data-[state=open]:slide-in-from-top-[30%] w-5 h-5"
        )}
      >
        <HeartIcon width={10} className="text-white" />
      </EmojiCirCleButton>
    );
  } else {
    return (
      <EmojiCirCleButton onClick={() => onLike()} className="w-5 h-5">
        <HeartIcon width={10} />
      </EmojiCirCleButton>
    );
  }
}
