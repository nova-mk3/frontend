"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@nova/ui/components/ui/carousel";
import { HTMLAttributes } from "react";

// Static import for blur support
import image10 from "@/src/asset/frame/image10.png";
import image14 from "@/src/asset/frame/image14.png";
import image3 from "@/src/asset/frame/image3.png";
import image23 from "@/src/asset/frame/image23.png";
import image21 from "@/src/asset/frame/image21.png";
import image5 from "@/src/asset/frame/image5.png";
import image19 from "@/src/asset/frame/image19.png";
import image29 from "@/src/asset/frame/image29.png";
import image2 from "@/src/asset/frame/image2.png";
import image30 from "@/src/asset/frame/image30.png";
import image27 from "@/src/asset/frame/image27.png";
import image13 from "@/src/asset/frame/image13.png";
import image18 from "@/src/asset/frame/image18.png";
import image25 from "@/src/asset/frame/image25.png";
import image12 from "@/src/asset/frame/image12.png";
import image7 from "@/src/asset/frame/image7.png";
import image9 from "@/src/asset/frame/image9.png";
import image8 from "@/src/asset/frame/image8.png";
import image28 from "@/src/asset/frame/image28.png";
import image22 from "@/src/asset/frame/image22.png";

const imageList = [
  image10,
  image14,
  image3,
  image23,
  image21,
  image5,
  image19,
  image29,
  image2,
  image30,
  image27,
  image13,
  image18,
  image25,
  image12,
  image7,
  image9,
  image8,
  image28,
  image22,
];

export default function FrameMobile({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
      }}
      className="hidden mobile:flex py-10 w-[70%]"
    >
      <CarouselContent>
        {imageList.map((img, idx) => (
          <CarouselItem key={idx}>
            <Image
              src={img}
              width={640}
              height={640}
              alt={`frame-${idx}`}
              placeholder="blur"
              className="w-full h-auto aspect-square object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export function DotGrid() {
  return (
    <div className="absolute -top-[10px] w-screen h-full bg-center [transform:translateZ(-500px)] [background-image:radial-gradient(circle_at_1px_1px,_gray_2px,_transparent_0)] [background-size:60px_60px]" />
  );
}
