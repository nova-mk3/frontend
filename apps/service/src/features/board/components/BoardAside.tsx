"use client";
import React, { useState } from "react";
import { Share2 } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@nova/ui/lib/utils";
import DesktopLike from "./DesktopLike";
import { throwErrorMessage } from "@/src/shared/utils/throwError";
import { EmojiCirCleButton } from "@/src/shared/ui/button/EmojiCirCleButton";
// boolean은 html이 인식하지 못함 ㄷㄷ....
// const DesktopLike = dynamic(() => import("./DesktopLike"), {
//   ssr: false,
//   loading: () => (
//     <EmojiCirCleButton>
//       <HeartIcon width={24} />
//     </EmojiCirCleButton>
//   ),
// });

interface AsideProps {
  count: number;
  className?: string;
  liked: boolean;
  postId: string;
}

export default function BoardAside({
  count,
  className,
  liked,
  postId,
}: AsideProps) {
  const pathname = usePathname(); // 현재 경로 가져오기
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const url = window.location.origin + pathname;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // 1초 후 메시지 사라지게
    } catch (error) {
      alert("복사 실패");
      throwErrorMessage(error);
    }
  };

  return (
    <div
      className={`w-[64px] h-[100%] bg-background02 flex flex-col mt-52 items-center gap-1.5 p-2 rounded-[32px] sticky top-[100px] mobile:hidden ${className}`}
    >
      <DesktopLike liked={liked} postId={postId} />

      <p className="text-[#868E96]">{count}</p>

      {/* 버튼을 컴포넌트로 나눠도 괜찮을듯! */}
      <EmojiCirCleButton onClick={handleCopy}>
        <Share2 size={24} />
      </EmojiCirCleButton>
      {copied && (
        <p
          data-state={copied ? "open" : "closed"}
          className={cn(
            "fixed text-white   rounded-lg left-[50%] top-[5%] z-50 grid  translate-x-[-50%]  border bg-text02 px-3 py-1 shadow-lg duration-2000 data-[state=open]:animate-in data-[state=open]:fade-in-0  data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2  sm:rounded-lg"
          )}
        >
          복사되었습니다
        </p>
      )}
    </div>
  );
}
