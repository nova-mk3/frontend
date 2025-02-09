"use client"
import { useState } from 'react';
import Image from 'next/image';
import React from 'react';
import Modal from './Modal';
import { Slider } from './Slider';



interface ImageSliderProps {
  speed?: number;
  infinite?: boolean;
}


const ImageSlider = ({  speed = 500, infinite = false } : ImageSliderProps) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const count = 3;
  const settings ={
    speed: speed,
    infinite : infinite
  }

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