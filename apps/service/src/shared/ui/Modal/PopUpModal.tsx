"use client";
import { Button } from "@nova/ui/components/ui/button";
import { cn } from "@nova/ui/lib/utils";
import React, { useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onAction?: () => void;
  children: React.ReactNode;
}
export default function PopUpModal({
  isOpen,
  onClose,
  onAction,
  children,
}: ModalProps) {
  const [shouldRender, setShouldRender] = useState(false);
  useEffect(() => {
    if (isOpen) {
      // 모달이 열리면 바로 렌더링
      setShouldRender(true);
    } else {
      setTimeout(() => {
        setShouldRender(false);
      }, 100);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div
      data-state={isOpen ? "open" : "closed"}
      className={cn(
        "absolute left-[50%] top-[10%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background01 p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        "min-w-[400px] min-h-[204px] p-8 flex flex-col"
      )}
    >
      {children}

      <div className="flex flex-row gap-2 ml-auto mt-auto">
        <Button
          variant="text"
          onClick={() => {
            if (onClose) onClose();
          }}
        >
          닫기
        </Button>
        <Button
          variant="default"
          onClick={() => {
            if (onAction) onAction();
          }}
        >
          다시 보지 않기
        </Button>
      </div>
    </div>
  );
}
