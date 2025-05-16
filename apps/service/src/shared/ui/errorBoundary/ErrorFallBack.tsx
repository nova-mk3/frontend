"use client";
import { Button } from "@nova/ui/components/ui/button";
import { FallbackProps } from "react-error-boundary";
import Link from "next/link";

export default function FallbackErrorUI({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div className="w-full h-[745px] bg-background02 flex flex-col items-center justify-center mt-8">
      <span className="text-xl font-bold text-center">
        {error.message}
        <br />
      </span>
      <span>오류가 발생했습니다! 아래 버튼을 통해 다른시도를 해보세요!</span>

      <div className="flex justify-center mt-8 flex-row gap-8">
        {/* ✅ 다시 시도 (에러 바운더리 리셋) */}
        <Link href="/signin">
          <Button variant="default">로그인</Button>
        </Link>

        {/* ✅ 메인으로 */}
        <Link href="/">
          <Button variant="text">메인으로</Button>
        </Link>

        <Button variant="text" onClick={() => window.history.back()}>
          뒤로가기
        </Button>
      </div>
    </div>
  );
}
