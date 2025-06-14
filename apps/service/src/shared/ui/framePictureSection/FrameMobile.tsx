"use client";

import Logo from "@/public/image/Logo.svg";
import { cn } from "@nova/ui/lib/utils";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@nova/ui/components/ui/carousel";
import { HTMLAttributes } from "react";

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
      className="hidden mobile:flex py-10 w-[70%] "
    >
      {/* 모바일의 경우 반응형이지만 640을 넘지 않아서 많은 srcset를 두는것보단 nextjs가 제공해주는 2개의 srcset으로 index.html 크기를 줄이자! */}
      <CarouselContent>
        <CarouselItem className="relative">
          <Image
            src="/image/frame/image10.png"
            width={640}
            height={640}
            alt="image"
            className="w-full h-auto aspect-square object-cover "
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src="/image/frame/image14.png"
            width={640}
            height={640}
            alt="image"
            className="w-full h-auto aspect-square object-cover "
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src="/image/frame/image3.png"
            width={640}
            height={640}
            alt="image"
            className="w-full h-auto aspect-square object-cover "
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src="/image/frame/image23.png"
            width={640}
            height={640}
            alt="image"
            className="w-full h-auto aspect-square object-cover "
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src="/image/frame/image21.png"
            width={640}
            height={640}
            alt="image"
            className="w-full h-auto aspect-square object-cover "
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src="/image/frame/image5.png"
            width={640}
            height={640}
            alt="image"
            className="w-full h-auto aspect-square object-cover "
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src="/image/frame/image19.png"
            width={640}
            height={640}
            alt="image"
            className="w-full h-auto aspect-square object-cover "
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src="/image/frame/image29.png"
            width={640}
            height={640}
            alt="image"
            className="w-full h-auto aspect-square object-cover "
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src="/image/frame/image2.png"
            width={640}
            height={640}
            alt="image"
            className="w-full h-auto aspect-square object-cover "
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src="/image/frame/image30.png"
            width={640}
            height={640}
            alt="image"
            className="w-full h-auto aspect-square object-cover "
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src="/image/frame/image27.png"
            width={640}
            height={640}
            alt="image"
            className="w-full h-auto aspect-square object-cover "
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src="/image/frame/image13.png"
            width={640}
            height={640}
            alt="image"
            className="w-full h-auto aspect-square object-cover "
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src="/image/frame/image18.png"
            width={640}
            height={640}
            alt="image"
            className="w-full h-auto aspect-square object-cover "
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src="/image/frame/image25.png"
            width={640}
            height={640}
            alt="image"
            className="w-full h-auto aspect-square object-cover "
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src="/image/frame/image12.png"
            width={640}
            height={640}
            alt="image"
            className="w-full h-auto aspect-square object-cover "
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src="/image/frame/image7.png"
            width={640}
            height={640}
            alt="image"
            className="w-full h-auto aspect-square object-cover "
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src="/image/frame/image9.png"
            width={640}
            height={640}
            alt="image"
            className="w-full h-auto aspect-square object-cover "
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src="/image/frame/image8.png"
            width={640}
            height={640}
            alt="image"
            className="w-full h-auto aspect-square object-cover "
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src="/image/frame/image28.png"
            width={640}
            height={640}
            alt="image"
            className="w-full h-auto aspect-square object-cover "
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src="/image/frame/image22.png"
            width={640}
            height={640}
            alt="image"
            className="w-full h-auto aspect-square object-cover "
          />
        </CarouselItem>
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
