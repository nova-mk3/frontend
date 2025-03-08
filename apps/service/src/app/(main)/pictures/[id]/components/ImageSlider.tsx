"use client";
import { useState } from "react";
import Image from "next/image";
import React from "react";
import Modal from "./Modal";
import { Slider } from "./Slider";
import { ImageProps } from "../PostDetail";

interface ImageSliderProps {
  speed?: number;
  infinite?: boolean;
  images: ImageProps[];
}

const ImageSlider = ({
  speed = 500,
  infinite = false,
  images,
}: ImageSliderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const settings = {
    speed: speed,
    infinite: infinite,
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Slider {...settings}>
        {images.map((image) => (
          <div key={image.id} className="min-w-full relative border">
            <Image
              src={image.imageUrl.replace("/file", "")}
              alt={image.originalFileName}
              fill
              sizes="100vw"
              className="object-cover  cursor-pointer"
              onClick={() => openModal()}
            />
          </div>
        ))}
        {/* Modal */}
      </Slider>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        total={images.length}
        images={images}
      />
    </>
  );
};

export default ImageSlider;
