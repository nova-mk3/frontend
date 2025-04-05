import { Button } from "@nova/ui/components/ui/button";
import React from "react";
import { ArrowLeft } from "lucide-react";

interface Props {
  postBtnname?: string;
}
export default function WriteBottomLayout({ postBtnname = "작성" }: Props) {
  return (
    <div className="flex items-center absolute bottom-0 w-full h-[64px] p-4 shadow-footer z-10 bg-white">
      <Button variant="text" className="w-[112px] t-l">
        <ArrowLeft size={20} />
        나가기
      </Button>
      <div className="flex flex-row gap-[20px] ml-auto items-center">
        {/* 아직 구현되지 않은 기능 */}
        {/* <Button className="t-l w-[112px]" variant="text">
        임시저장
      </Button> */}
        <Button className="w-[112px] t-l" type="submit">
          {postBtnname}
        </Button>
      </div>
    </div>
  );
}
