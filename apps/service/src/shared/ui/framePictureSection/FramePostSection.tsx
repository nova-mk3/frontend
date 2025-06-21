import { cn } from "@nova/ui/lib/utils";
import { HTMLAttributes } from "react";
import Logo from "@/public/image/Logo.svg";

import PostSectionHydration from "./PostSectionHydration";
export default function FramePostSection({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(className)} {...props}>
      <div className="w-screen">
        <div className="absolute  w-screen h-[550px] bg-background02 mobile:min-h-[1000px]" />
      </div>
      <div className="flex flex-row h-[550px] py-20 justify-between relative max-w-screen-xl  mx-auto mobile:flex-col mobile:min-h-[1000px] ">
        <div className="flex flex-col pl-20  min-h-[500px] ">
          <div className="d-s text-primary !font-bold">NOVA</div>
          <div className="d-m !font-bold">NEWS</div>
          <Logo fill="#000000" width="250px" />
        </div>
        <PostSectionHydration />
      </div>
    </div>
  );
}
