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


  const handlePrevImage = (e : React.MouseEvent)=>{
    prevImage();
    e.stopPropagation();
  }
  const handleNextImage = (e : React.MouseEvent)=>{
    nextImage();
    e.stopPropagation();
  }


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
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/90 " onClick={onClose}>

      {/* 상단 아이콘 모음 */}
      <div className='absolute top-5 right-5 flex flex-row gap-4'>
      
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

      <div className='absolute top-5 left-1/2 transform -translate-x-1/2 text-white t-m flex h-[24px] items-center'>
        {currentIndex} / {total}
      </div>


      {/* 좌측 화살표 */}
      <button
        onClick={handlePrevImage}
        className="absolute left-5 text-white z-50"
        aria-label="Previous Image"
      >
        <ChevronLeft size={24} />
      </button>

      {/* 우측 화살표 */}
      <button
        onClick={handleNextImage}
        className="absolute right-5 text-white z-50"
        aria-label="Next Image"
      >
        <ChevronRight size={24} />
      </button>




      {/* TODO: 사이즈 원본 크기 이야기 */}

      
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
                   onClick={(e)=>e.stopPropagation()}
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