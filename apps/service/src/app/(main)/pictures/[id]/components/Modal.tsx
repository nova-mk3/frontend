"use client";

import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import Image from "next/image";
import { useSliderStore } from "@/src/store/ImageSlider";
import { ImageProps } from "../PostDetail";
import { cn } from "@nova/ui/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  images: ImageProps[];
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, total, images }) => {
  const { currentIndex, setCurrentIndex } = useSliderStore();
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "ArrowRight") {
        nextImage();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden"; // 스크롤 방지
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, currentIndex]);

  const handlePrevImage = (e: React.MouseEvent) => {
    prevImage();
    e.stopPropagation();
  };
  const handleNextImage = (e: React.MouseEvent) => {
    nextImage();
    e.stopPropagation();
  };

  const prevImage = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : total - 1;
    setCurrentIndex(newIndex);
  };

  const nextImage = () => {
    const newIndex = currentIndex < total - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
  };

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prev) => Math.min(1.5, prev + 0.25));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prev) => Math.max(1, prev - 0.25));
  };

  if (!isOpen) return null;

  return (
    // 임시 버튼 추후에 디자인 수정 예정
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-black/90 "
      onClick={onClose}
    >
      {/* 상단 아이콘 모음 */}
      <div className="absolute top-5 right-5 flex flex-row gap-4 items-center">
        <div className="text-white">{scale * 100} %</div>
        <button
          onClick={handleZoomIn}
          className=" text-white 0  z-50"
          aria-label="Close Modal"
        >
          <ZoomIn size={24} />
        </button>
        <button
          onClick={handleZoomOut}
          className=" text-white 0  z-50"
          aria-label="Close Modal"
        >
          <ZoomOut size={24} />
        </button>
        <button
          onClick={onClose}
          className=" text-white 0  z-50"
          aria-label="Close Modal"
        >
          <Download size={24} />
        </button>
        <button
          onClick={onClose}
          className=" text-white rounded-full  z-50"
          aria-label="Close Modal"
        >
          <X size={24} />
        </button>
      </div>

      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 text-white t-m flex h-[24px] items-center">
        {currentIndex + 1} / {total}
      </div>

      {/* 좌측 화살표 */}

      {currentIndex !== 0 && (
        <button
          onClick={handlePrevImage}
          className="absolute left-5 text-white z-50"
          aria-label="Previous Image"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* 우측 화살표 */}
      {currentIndex !== total - 1 && (
        <button
          onClick={handleNextImage}
          className="absolute right-5 text-white z-50"
          aria-label="Next Image"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* TODO: 사이즈 원본 크기 이야기 */}

      <div className="relative mx-auto overflow-hidden z-10">
        {/* 이미지 표시 */}
        <div
          className="flex w-screen h-screen"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transitionDuration: `500ms`, // 동적으로 전환 속도 설정
            transitionTimingFunction: "ease-in-out", // 전환 타이밍 함수 설정
          }}
        >
          {images.map((image, index) => (
            <div
              key={image.id}
              className="min-w-full relative z-20 flex justify-center p-[10%]"
            >
              <Image
                src={image.imageUrl.replace("/file", "")}
                alt={image.originalFileName}
                width={image.width}
                height={image.height}
                style={{
                  transform:
                    index === currentIndex ? `scale(${scale})` : "scale(1)",
                  transition: "transform 300ms",
                }}
                className={cn(`object-contain`)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
