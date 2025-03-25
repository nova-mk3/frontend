import React from "react";

import FramePictureSection from "./components/FramePictureSection/FramePictureSection";
import FramePostSection from "./components/FramePictureSection/FramePostSection";
import FrameAboutMeSection from "./components/FramePictureSection/FrameAboutMeSection";

export default function Home() {
  return (
    <>
      {/* header가 정상 작동하면은 스크롤 패딩과 마진을 없애도 됨. @patrache*/}
      <div className="flex justify-center">
        <FramePictureSection className="relative w-screen" />
      </div>
      <div className="flex justify-center">
        <FramePostSection className="relative w-screen" />
      </div>
      <div className="flex justify-center mt-40">
        <FrameAboutMeSection className="relative w-screen" />
      </div>
      <div className="flex  justify-center">
        <div className="d-m !font-bold text-center my-10">JOIN NOVA!</div>
      </div>
    </>
  );
}
