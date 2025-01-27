'use client';

import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Download, X } from 'lucide-react';
import Image from 'next/image';
interface ImageType {
  src: string;
  alt: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentIndex: number;
  total: number;
  setCurrentIndex: (index: number) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, currentIndex,total, setCurrentIndex }) => {

  const [imageData, setImageData] = useState<{ src: string; width: number; height: number } | null>(null);

  useEffect(() => {
    const fetchImageInfo = async () => {
      const img = new window.Image();
      img.src = "/image/cat1.jpg"; // 이미지 경로

      img.onload = () => {
        setImageData({
          src: img.src,
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      };
    };

    fetchImageInfo();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };


    if (isOpen) {
      document.body.style.overflow = 'hidden'; // 스크롤 방지
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, currentIndex]);

  const prevImage = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : total -1;
    setCurrentIndex(newIndex);
  };

  const nextImage = () => {
    const newIndex = currentIndex < total -1 ? currentIndex +1 : 0;
    setCurrentIndex(newIndex);
  };

  if (!isOpen) return null;

  return (
    // 임시 버튼 추후에 디자인 수정 예정
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/90 ">
      {/* 닫기 버튼 */}
      <button
        onClick={onClose}
        className="absolute top-5 right-4 text-white bg-gray-800 p-2 rounded-full hover:bg-gray-700 focus:outline-none z-50"
        aria-label="Close Modal"
      >
        <X size={24} />
      </button>
      <button
        onClick={onClose}
        className="absolute top-5 right-16 text-white bg-gray-800 p-2 rounded-full hover:bg-gray-700 focus:outline-none z-50"
        aria-label="Close Modal"
      >
        <Download size={24} />
      </button>

      {/* 좌측 화살표 */}
      <button
        onClick={prevImage}
        className="absolute left-5 text-white bg-gray-800 p-2 rounded-full hover:bg-gray-700 focus:outline-none z-50"
        aria-label="Previous Image"
      >
        <ChevronLeft size={24} />
      </button>

      {/* 우측 화살표 */}
      <button
        onClick={nextImage}
        className="absolute right-5 text-white bg-gray-800 p-2 rounded-full hover:bg-gray-700 focus:outline-none z-50"
        aria-label="Next Image"
      >
        <ChevronRight size={24} />
      </button>



      {/* 각각의 내부 크기를 들고 있어야하는데 이걸 고민해보자 */}

      
      {/* 서버에서 원본 사이즈를 보내줘야할거 같은데 */}
      <div className="relative mx-auto overflow-hidden z-10">
      {/* 이미지 표시 */}
      <div className="flex w-screen h-screen"
        style={{ transform: `translateX(-${currentIndex * 100}%)`,
        transitionDuration: `500ms`, // 동적으로 전환 속도 설정
        transitionTimingFunction: 'ease-in-out', // 전환 타이밍 함수 설정
      }}>
        <div className="min-w-full relative z-20 flex justify-center p-[10%]">
            <Image
                   src="/image/cat.jpg"
                   alt="image"
                   width={3000}
                   height={0}
                   className='object-contain'
                />
        </div>
        <div className="min-w-full   relative z-20 flex justify-center p-[10%]">
        <Image
                   src="/image/cat1.jpg"
                   alt="image"
                   width={3000}
                   height={0}
                   className='object-contain'
                   quality={100}
                />
    
      </div>
      <div className="min-w-full relative z-20 flex justify-center ">
        <Image
                   src="/image/cat.jpg"
                   alt="image"
                   width={768}
                   height={0}
                   className='object-contain'
                />
    
      </div>
      </div>
      </div>
    </div>
  );
};

export default Modal;