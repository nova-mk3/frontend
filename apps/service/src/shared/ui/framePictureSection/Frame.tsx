"use client";

import Logo from "@/public/image/Logo.svg";
import { cn } from "@nova/ui/lib/utils";
import Image from "next/image";
import { HTMLAttributes } from "react";

export default function Frame({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(className)} {...props}>
      <Image
        src="/image/frame/image10.png"
        width={177}
        height={125}
        alt="image"
        className="absolute top-[130px] left-[0px] object-cover"
      />
      <Image
        src="/image/frame/image14.png"
        width={129}
        height={137}
        alt="image"
        className="absolute top-[118px] left-[186px] object-cover"
      />
      <Image
        src="/image/frame/image3.png"
        width={190}
        height={150}
        alt="image"
        className="absolute top-[106px] left-[326px] object-cover"
      />
      <Image
        src="/image/frame/image23.png"
        width={175}
        height={138}
        alt="image"
        className="absolute top-[118px] left-[526px] object-cover"
      />
      <Image
        src="/image/frame/image21.png"
        width={190}
        height={150}
        alt="image"
        className="absolute top-[106px] left-[710px] object-cover"
      />
      <Image
        src="/image/frame/image5.png"
        width={115}
        height={147}
        alt="image"
        className="absolute top-[109px] left-[910px] object-cover"
      />
      <Image
        src="/image/frame/image19.png"
        width={133}
        height={126}
        alt="image"
        className="absolute top-[130px] left-[1034px] object-cover"
      />
      <Image
        src="/image/frame/image29.png"
        width={230}
        height={126}
        alt="image"
        className="absolute top-[150px] left-[1174px] object-cover"
      />
      <Image
        src="/image/frame/image2.png"
        width={177}
        height={121}
        alt="image"
        className="absolute top-[270px] left-[-40px] object-cover"
      />
      <Image
        src="/image/frame/image30.png"
        width={177}
        height={117}
        alt="image"
        className="absolute top-[270px] left-[146px] object-cover"
      />
      <Image
        src="/image/frame/image26.png"
        width={177}
        height={146}
        alt="image"
        className="absolute top-[270px] left-[304px] object-cover"
      />
      <Image
        src="/image/frame/image27.png"
        width={698}
        height={403}
        alt="image"
        className="absolute top-[270px] left-[490px] object-cover"
      />
      <Image
        src="/image/frame/image13.png"
        width={225}
        height={300}
        alt="image"
        className="absolute top-[270px] left-[1196px] object-cover"
      />
      <Image
        src="/image/frame/image18.png"
        width={177}
        height={177}
        alt="image"
        className="absolute top-[404px] left-[-40px] object-cover"
      />
      <Image
        src="/image/frame/image25.png"
        width={147}
        height={142}
        alt="image"
        className="absolute top-[404px] left-[146px] object-cover"
      />
      <Image
        src="/image/frame/image12.png"
        width={188}
        height={230}
        alt="image"
        className="absolute top-[430px] left-[294px] object-cover"
      />
      <Image
        src="/image/frame/image7.png"
        width={148}
        height={230}
        alt="image"
        className="absolute top-[594px] left-[-20px] object-cover"
      />
      <Image
        src="/image/frame/image9.png"
        width={148}
        height={230}
        alt="image"
        className="absolute top-[554px] left-[138px] object-cover"
      />
      <Image
        src="/image/frame/image11.png"
        width={272}
        height={193}
        alt="image"
        className="absolute top-[744px] left-[138px] object-cover"
      />
      <Image
        src="/image/frame/image8.png"
        width={123}
        height={193}
        alt="image"
        className="absolute top-[734px] left-[418px] object-cover"
      />
      <Image
        src="/image/frame/image28.png"
        width={480}
        height={165}
        alt="image"
        className="absolute top-[684px] left-[550px] object-cover"
      />
      <Image
        src="/image/frame/image22.png"
        width={240}
        height={165}
        alt="image"
        className="absolute top-[574px] left-[1196px] object-cover"
      />
      <Logo
        className="absolute top-[90px] left-[498px]"
        fill="#B096F5"
        width="40px"
      />
    </div>
  );
}

export function DotGrid() {
  return (
    <div className="absolute -top-[10px] w-screen h-full bg-center [transform:translateZ(-500px)] [background-image:radial-gradient(circle_at_1px_1px,_gray_2px,_transparent_0)] [background-size:60px_60px]" />
  );
}
