import React from "react";
import FramePictureSection from "./components/FramePictureSection/FramePictureSection";
import FramePostSection from "./components/FramePictureSection/FramePostSection";
import FrameAboutMeSection from "./components/FramePictureSection/FrameAboutMeSection";
import PopUp from "./components/PopUp";

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
      <PopUp />
    </>
  );
}
