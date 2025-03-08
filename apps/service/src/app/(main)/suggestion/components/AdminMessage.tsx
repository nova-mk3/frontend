import { toFormattedDate } from "@/src/libs/utils/dateParsing";
import { Circle } from "lucide-react";
import React from "react";

interface Props {
  adminReply: string | null;
  time: string;
}
export default function AdminMessage({ adminReply, time }: Props) {
  if (adminReply === null) {
    return (
      <div className="bg-background02 rounded-lg p-6">
        <div className="prose prose-sm max-w-none">
          <p>답변을 준비중 입니다</p>
        </div>
      </div>
    );
  }
  if (adminReply) {
    return (
      <div className="bg-background02 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Circle size={32} />
          <div>
            <div className="font-medium">관리자</div>
            <div className="text-sm text-muted-foreground">
              {toFormattedDate(time)}
            </div>
          </div>
        </div>
        <div className="prose prose-sm max-w-none">
          <p>{adminReply}</p>
        </div>
      </div>
    );
  }
}
