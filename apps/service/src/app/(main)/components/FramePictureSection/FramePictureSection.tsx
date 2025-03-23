"use client";

import { cn } from "@nova/ui/lib/utils";
import { HTMLAttributes } from "react";
import Frame, { DotGrid } from "./Frame";

export default function FramePictureSection({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(className)} {...props}>
      {/* TODO : 나중에 시간되면 등장 애니메이션 같은게 있으면 좋겠음. */}
      {/* TODO : 나중에 애니메이션을 넣어야함 3d카드 느낌으로 */}
      <div className="d-l mt-4 mb-4 w-screen text-center">
        CBNU software club NOVA
      </div>
      <div className="relative w-screen flex justify-center">
        <DotGrid />
        <Frame className="relative w-[1400px] h-screen" />
      </div>
    </div>
  );
}
