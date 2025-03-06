"use client";
import React, { useState } from "react";
import { EmojiCirCleButton } from "./Aside";
import HeartIcon from "@/public/image/Heart.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LikeAPI, UnLikeAPI } from "@/src/api/board/like";
import { postKeys } from "../query/postqueries";
import { cn } from "@nova/ui/lib/utils";

interface LikeProps {
  liked: boolean;
  postId: string;
}
export default function DesktopLike({ liked, postId }: LikeProps) {
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
          "bg-primary border-none hover:opacity-90 !duration-1000 data-[state=open]:animate-in   data-[state=open]:slide-in-from-top-[30%] "
        )}
      >
        <HeartIcon width={24} className="text-white" />
      </EmojiCirCleButton>
    );
  } else {
    return (
      <EmojiCirCleButton onClick={() => onLike()}>
        <HeartIcon width={24} />
      </EmojiCirCleButton>
    );
  }
}
