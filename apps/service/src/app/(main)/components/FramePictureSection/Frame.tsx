"use client";

import Logo from "@/public/image/Logo.svg";
import { cn } from "@nova/ui/lib/utils";
import Image from "next/image";
import { HTMLAttributes } from "react";
// TODO: 현재 재학중인 모두가 사진에 나왔으면 함.
// TODO: 이미지 인식으로 마우스 커서 올리면 누구인지 나왔으면 함.
export default function Frame({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(className)} {...props}>
      <DotGrid />
      <Image
        src={"/image/frame/image10.png"}
        width={177}
        height={125}
        alt="image"
        className="absolute top-[130px] left-[160px] object-cover"
      />
      <Image
        src={"/image/frame/image14.png"}
        width={129}
        height={137}
        alt="image"
        className="absolute top-[118px] left-[346px] object-cover"
      />
      <Image
        src={"/image/frame/image3.png"}
        width={190}
        height={150}
        alt="image"
        className="absolute top-[106px] left-[486px] object-cover"
      />
      <Image
        src={"/image/frame/image23.png"}
        width={175}
        height={138}
        alt="image"
        className="absolute top-[118px] left-[686px] object-cover"
      />
      <Image
        src={"/image/frame/image21.png"}
        width={190}
        height={150}
        alt="image"
        className="absolute top-[106px] left-[870px] object-cover"
      />
      <Image
        src={"/image/frame/image5.png"}
        width={115}
        height={147}
        alt="image"
        className="absolute top-[109px] left-[1070px] object-cover"
      />
      <Image
        src={"/image/frame/image19.png"}
        width={133}
        height={126}
        alt="image"
        className="absolute top-[130px] left-[1194px] object-cover"
      />
      <Image
        src={"/image/frame/image29.png"}
        width={230}
        height={126}
        alt="image"
        className="absolute top-[150px] left-[1334px] object-cover"
      />
      <Image
        src={"/image/frame/image2.png"}
        width={177}
        height={121}
        alt="image"
        className="absolute top-[270px] left-[120px] object-cover"
      />
      <Image
        src={"/image/frame/image30.png"}
        width={177}
        height={117}
        alt="image"
        className="absolute top-[270px] left-[306px] object-cover"
      />
      <Image
        src={"/image/frame/image26.png"}
        width={177}
        height={146}
        alt="image"
        className="absolute top-[270px] left-[494px] object-cover"
      />
      <Image
        src={"/image/frame/image27.png"}
        width={698}
        height={403}
        alt="image"
        className="absolute top-[270px] left-[680px] object-cover"
      />
      <Image
        src={"/image/frame/image13.png"}
        width={225}
        height={300}
        alt="image"
        className="absolute top-[270px] left-[1386px] object-cover"
      />
      <Image
        src={"/image/frame/image18.png"}
        width={177}
        height={177}
        alt="image"
        className="absolute top-[404px] left-[140px] object-cover"
      />
      <Image
        src={"/image/frame/image25.png"}
        width={147}
        height={142}
        alt="image"
        className="absolute top-[404px] left-[326px] object-cover"
      />
      <Image
        src={"/image/frame/image12.png"}
        width={188}
        height={230}
        alt="image"
        className="absolute top-[430px] left-[484px] object-cover"
      />
      <Image
        src={"/image/frame/image7.png"}
        width={148}
        height={230}
        alt="image"
        className="absolute top-[594px] left-[170px] object-cover"
      />
      <Image
        src={"/image/frame/image9.png"}
        width={148}
        height={230}
        alt="image"
        className="absolute top-[554px] left-[328px] object-cover"
      />
      <Image
        src={"/image/frame/image11.png"}
        width={272}
        height={193}
        alt="image"
        className="absolute top-[744px] left-[328px] object-cover"
      />
      <Image
        src={"/image/frame/image8.png"}
        width={123}
        height={193}
        alt="image"
        className="absolute top-[734px] left-[608px] object-cover"
      />
      <Image
        src={"/image/frame/image28.png"}
        width={480}
        height={165}
        alt="image"
        className="absolute top-[684px] left-[740px] object-cover"
      />
      <Image
        src={"/image/frame/image22.png"}
        width={240}
        height={165}
        alt="image"
        className="absolute top-[574px] left-[1386px] object-cover"
      />
      <Logo
        className="absolute top-[206px] left-[688px]"
        fill="#B096F5"
        width="40px"
      />
    </div>
  );
}

function DotGrid() {
  return (
    <div className="absolute -top-[10px] w-screen h-full bg-center [transform:translateZ(-500px)] [background-image:radial-gradient(circle_at_1px_1px,_gray_2px,_transparent_0)] [background-size:60px_60px]" />
  );
}
