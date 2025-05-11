"use client";
import React, { useState } from "react";
import HeartIcon from "@/public/image/Heart.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postKeys } from "../../board/query/queryKey";
import { LikeAPI, UnLikeAPI } from "../api/like.api";

interface LikeProps {
  liked: boolean;
  postId: string;
  count: number;
}

export default function MobileLike({ liked, count, postId }: LikeProps) {
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

  return (
    <div
      className={`w-[66px] h-[25px]  flex-row items-center rounded-md gap-[15px] justify-center cursor-pointer my-auto mobile:flex hidden
    ${liked ? "bg-primary" : " bg-white border-line01 border "}
    `}
      onClick={liked ? onUnLike : onLike}
    >
      <HeartIcon width={15} fill={`${liked ? "#ffffff" : "#d9d9d9"}`} />

      <p className={`t-s ${liked ? "text-background01" : "text-line01"}`}>
        {count}
      </p>
    </div>
  );
}
