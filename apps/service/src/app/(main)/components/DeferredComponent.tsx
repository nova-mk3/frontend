"use client";
import { PropsWithChildren, useEffect, useState } from "react";
import PendingFallbackUI from "./Skeleton/PendingFallbackUI";
import EmptyFallbackUI from "./Skeleton/EmptyFallbackUI";

// ** 지연시간 200ms 미만일 때 스켈레톤 미노출 / 200ms 이상일 때 스켈레톤 노출 **
const DeferredComponent = ({ children }: PropsWithChildren) => {
  const [isDeferred, setIsDeferred] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsDeferred(true);
    }, 500);
    return () => clearTimeout(timeOut);
  }, []);

  // 서버컴포넌트는 기본 fallback을 받는다
  // 클라이언트 경우는 useEffect를 인식해서, 0.5초 동안 보여주고, 그 이후에는 chuildren pendingUI가 보여짐!
  if (!isDeferred) return <EmptyFallbackUI />;
  return <>{children}</>;
};

export default DeferredComponent;
