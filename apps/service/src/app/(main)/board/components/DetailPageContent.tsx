import { cn } from "@nova/ui/lib/utils";
import React from "react";

interface Props {
  content?: string;
}
export default function DetailPageContent({ content }: Props) {
  return (
    <pre
      className={cn(
        "max-w-none mb-8 min-h-[240px] t-m break-all whitespace-pre-wrap"
      )}
    >
      {content}
    </pre>
  );
}
