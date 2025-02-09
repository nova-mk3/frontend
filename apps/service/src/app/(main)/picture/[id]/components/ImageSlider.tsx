"use client"
import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft,ChevronRight } from 'lucide-react';
import React from 'react';
import { Download } from 'lucide-react';
import Modal from './Modal';
import { Slider } from './Slider';



interface ImageSliderProps {
  speed?: number;
  infinite?: boolean;
}

const settings = {
  speed: 500,
  infinite: false,
};



const ImageSlider = ({  speed = 500, infinite = false } : ImageSliderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const count = 3;


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
  <>
  <Slider {...settings}>


     <div className='min-w-full relative'>
      <Image
       src="/image/cat.jpg"
       alt="이미지"
       fill={true}
       sizes="100vw"
       className='object-cover cursor-pointer'
       onClick={() => openModal()}
      />
    
     </div>

     <div className='min-w-full relative'>
      <Image
       src="/image/cat.jpg"
       alt="image"
       fill={true}
       sizes="100vw"
       className='object-cover cursor-pointer'
       onClick={() => openModal()}
      />
    
     </div>

     <div className='min-w-full relative'>
      <Image
       src="/image/cat.jpg"
       alt="image"
       fill={true}
       sizes="100vw"
       className='object-cover cursor-pointer'
        onClick={() => openModal()}
      />
      
     </div>
     {/* Modal */}
  </Slider>
  <Modal
   isOpen={isModalOpen}
   onClose={closeModal}
   total={count}
 />
  </>
  );
};

export default ImageSlider;