import React from "react";
import Link from "next/link";
import { ChevronLeft, MessageSquareMore } from "lucide-react";
import { Separator } from "@nova/ui/components/ui/separator";
import { Button } from "@nova/ui/components/ui/button";

interface TitleProps {
  backLinkText: string;
  backLink: string;
  title: string;
  className?: string;
  defaultHref?: string;
  postId: string;
}

export default function DetailPageTitle({
  backLink,
  backLinkText,
  title,
  postId,
  defaultHref = "",
}: TitleProps) {
  return (
    <div className="border-y bg-background01">
      <div className="w-[80%] mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              href={backLink.toLocaleLowerCase()}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="font-medium">{backLinkText}</span>
            </Link>
            <Separator orientation="vertical" className="h-4 mx-2" />
            <div className="flex items-center gap-2">
              <MessageSquareMore className="w-4 h-4" />
              <span className="text-sm text-muted-foreground">
                {title} #{postId}
              </span>
            </div>
          </div>
          <Link href={`${defaultHref}/newpost`}>
            <Button variant="outline">작성하기</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
