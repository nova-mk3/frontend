import FrameAboutMeSection from "@/src/shared/ui/framePictureSection/FrameAboutMeSection";
import FramePictureSection from "@/src/shared/ui/framePictureSection/FramePictureSection";
import FramePostSection from "@/src/shared/ui/framePictureSection/FramePostSection";
import PopUpMessage from "@/src/shared/ui/popup/PopUpMessage";
import React from "react";

export default function Home() {
  return (
    <>
      {/* header가 정상 작동하면은 스크롤 패딩과 마진을 없애도 됨. @patrache*/}
      <div className="flex justify-center">
        <FramePictureSection className="relative [width:calc(100vw-10px)]" />
      </div>
      <div className="flex justify-center">
        <FramePostSection className="relative w-screen" />
      </div>
      <div className="flex justify-center mt-40 ">
        <FrameAboutMeSection className="relative w-screen px-8 mobile:w-[90%]" />
      </div>
      <PopUpMessage />
    </>
  );
}
