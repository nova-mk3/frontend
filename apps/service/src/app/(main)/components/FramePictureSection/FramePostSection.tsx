"use client";

import { cn } from "@nova/ui/lib/utils";
import { HTMLAttributes } from "react";
import { DotGrid } from "./Frame";

export default function FramePostSection({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("border-[1px] border-black ", className)} {...props}>
      <div className="d-l !font-bold mt-4 mb-4 w-screen ml-auto"></div>
      <div className="relative w-screen flex justify-center">
        <DotGrid />
      </div>
    </div>
  );
}
