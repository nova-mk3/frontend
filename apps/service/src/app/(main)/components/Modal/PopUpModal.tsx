"use client";
import { Button } from "@nova/ui/components/ui/button";
import { cn } from "@nova/ui/lib/utils";
import React, { useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  title: string;
  subtitle: string;
  onClose?: () => void;
  onAction?: () => void;
}
export default function Modal({
  isOpen,
  title,
  subtitle,
  onClose,
  onAction,
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
        "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      )}
    >
      <div
        data-state={isOpen ? "open" : "closed"}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background01 p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          "w-[400px] h-[204px] p-8 flex flex-col"
        )}
      >
        <p className="t-l ">{title}</p>
        <p className="t-m text-text02">{subtitle}</p>
        <div className="flex flex-row gap-2 ml-auto mt-auto">
          <Button
            variant="text"
            className="w-[72px]"
            onClick={() => {
              if (onClose) onClose();
            }}
          >
            취소
          </Button>
          <Button
            variant="default"
            className="w-[72px]"
            onClick={() => {
              if (onAction) onAction();
            }}
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}
