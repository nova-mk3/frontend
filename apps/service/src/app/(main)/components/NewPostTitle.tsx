import { Button } from "@nova/ui/components/ui/button";
import { Separator } from "@nova/ui/components/ui/separator";
import { ChevronLeft, MessageSquare } from "lucide-react";
import Link from "next/link";
import { title } from "process";
import React from "react";
interface Props {
  backLinkText: string;
  backLink: string;
  title: string;
}

export default function NewPostTitle({ backLink, backLinkText, title }: Props) {
  return (
    <div className="border-b bg-background01 t-m">
      <div className="w-[80%] mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              href={backLink}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="font-medium ">{backLinkText}</span>
            </Link>
            <Separator orientation="vertical" className="h-4 mx-2" />
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm text-muted-foreground">{title}</span>
            </div>
          </div>
          <Button type="submit">등록하기</Button>
        </div>
      </div>
    </div>
  );
}
