"use client";

import FramePictureSection from "./components/FramePictureSection/FramePictureSection";

export default function Home() {
  return (
    <>
      {/* header가 정상 작동하면은 스크롤 패딩과 마진을 없애도 됨. @patrache*/}
      <div className="scroll-pt-36 scroll-mt-36 snap-start h-full flex justify-center w-screen">
        <FramePictureSection className="relative" />
      </div>
      <div className="snap-start h-screen flex items-center justify-center">
        section2
      </div>
      <div className="snap-start h-screen flex items-center justify-center">
        section3
      </div>
      <div className="snap-start h-screen flex items-center justify-center">
        section4
      </div>
    </>
  );
}
