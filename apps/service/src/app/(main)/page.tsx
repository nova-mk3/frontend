import React from "react";

import FramePictureSection from "./components/FramePictureSection/FramePictureSection";
import FramePostSection from "./components/FramePictureSection/FramePostSection";

export default function Home() {
  return (
    <>
      {/* header가 정상 작동하면은 스크롤 패딩과 마진을 없애도 됨. @patrache*/}
      <div className="flex justify-center">
        <FramePictureSection className="relative w-screen" />
      </div>
      <div className="snap-start  flex items-center justify-center">
        <FramePostSection className="relative w-screen" />
      </div>
      <div className="snap-start h-screen flex items-center justify-center">
        제작중
      </div>
      <div className="snap-start h-screen flex items-center justify-center">
        제작중
      </div>
    </>
  );
}
