"use client";

export default function Home() {
  return (
    <>
      {/* header가 정상 작동하면은 스크롤 패딩과 마진을 없애도 됨. */}
      <div className="scroll-pt-36 scroll-mt-36 snap-start h-screen flex items-center justify-center">
        section1
      </div>
      <div className="snap-start h-screen flex items-center justify-center">
        section2
      </div>
      <div className="snap-start h-screen flex items-center justify-center">
        section3
      </div>
    </>
  );
}
