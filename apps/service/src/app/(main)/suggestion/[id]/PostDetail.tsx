"use client";
import { Button } from "@nova/ui/components/ui/button";
import React from "react";

import { suggestionKeys, useSuggestionDetailQuery } from "../query/queries";
import { Unlock, Lock, ChevronLeft, MessageSquare } from "lucide-react";
import Link from "next/link";
import AdminMessage from "../components/AdminMessage";
import { Separator } from "@nova/ui/components/ui/separator";
import { FileListLayout, FileList } from "../components/ViewFileLayout";

import AdminForm from "../components/AdminForm";
import { FileItemProps } from "../components/ViewFileItem";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SimpleProfileQueryOptions } from "../../users/[id]/query/options";
import DeferredComponent from "@/src/shared/ui/errorBoundary/DeferredComponent";
import PendingFallbackUI from "@/src/shared/ui/skeleton/PendingFallbackUI";
import { toFormattedDate } from "@/src/shared/utils/dateParsing";
import DetailPageContent from "@/src/features/board/components/DetailPageContent";

interface PostDetailProps {
  postId: string;
}

export interface SuggestionDetail {
  adminReply: string | null;
  adminReplyTime: string | null;
  authorName: string;
  content: string;
  createdTime: string;
  files: FileItemProps[];
  id: string;
  private: boolean;
  title: string;
}
export default function PostDetail({ postId }: PostDetailProps) {
  const { data, isLoading } = useSuggestionDetailQuery(postId);
  const { data: userData } = useQuery(SimpleProfileQueryOptions());
  const queryClient = useQueryClient();
  if (isLoading) {
    return (
      <DeferredComponent>
        <PendingFallbackUI />
      </DeferredComponent>
    );
  }

  return (
    <div className="flex flex-col t-m mx-auto gap-6">
      <div className="border-b bg-background01">
        <div className="w-[80%] mx-auto px-4 py-3 mobile:w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link
                href="/suggestion"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => {
                  queryClient.invalidateQueries({
                    queryKey: suggestionKeys.lists(),
                    refetchType: "inactive",
                  });
                }}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="font-medium">건의함</span>
              </Link>
              <Separator orientation="vertical" className="h-4 mx-2" />
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm text-muted-foreground">
                  건의사항 #{data!.id}
                </span>
              </div>
            </div>
            <Button variant="outline">
              <Link
                href="/suggestion/newpost"
                onClick={(e) => {
                  if (!userData) {
                    e.preventDefault(); // ✅ 이동 막기
                    alert("로그인 후 이용해주세요");
                  }
                }}
              >
                새 건의하기
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-[80%] mx-auto gap-6">
        <div className="mb-8 mt-8">
          <h1 className="text-3xl font-bold mb-4">{data!.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{toFormattedDate(data!.createdTime)}</span>
            <span>{data!.authorName}</span>
            <div className="flex items-center gap-1">
              {data!.private.toString() === "true" ? (
                <Lock className="w-4 h-4" />
              ) : (
                <Unlock className="w-4 h-4" />
              )}
              <span className="text-sm">
                {data!.private.toString() === "true" ? "비공개" : "공개"}
              </span>
            </div>
          </div>
        </div>

        <DetailPageContent content={data!.content} />
        <Separator />
        <span className="text-xl font-semibold">첨부파일</span>
        <FileListLayout>
          <FileList files={data!.files} />
        </FileListLayout>
        {/* 관리자 답변 영역 */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 mt-8">관리자 답변</h2>
          <AdminMessage
            adminReply={data!.adminReply}
            time={toFormattedDate(data!.adminReplyTime!)}
          />
        </div>

        {/* 관리자 댓글 입력 영역 */}
        {userData?.admin.toString() === "true" && (
          <AdminForm postId={postId} adminReply={data!.adminReply} />
        )}
      </div>
    </div>
  );
}
