import React from "react";

import FramePictureSection from "./components/FramePictureSection/FramePictureSection";

export default function Home() {
  return (
    <>
      {/* header가 정상 작동하면은 스크롤 패딩과 마진을 없애도 됨. @patrache*/}
      <div className="h-screen flex justify-center">
        <FramePictureSection className="relative w-screen" />
      </div>
      <div className="snap-start h-screen flex items-center justify-center bg-gray-700">
        하이?
      </div>
      <div className="snap-start h-screen flex items-center justify-center">
        하이?
      </div>
      <div className="snap-start h-screen flex items-center justify-center">
        section4
      </div>
    </>
  );
}
