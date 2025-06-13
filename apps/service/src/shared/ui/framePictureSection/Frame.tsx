import Logo from "@/public/image/Logo.svg";
import { cn } from "@nova/ui/lib/utils";
import Image from "next/image";
import { HTMLAttributes } from "react";
// static import
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
import image26 from "@/src/asset/frame/image26.png";
import image27 from "@/src/asset/frame/image27.png";
import image13 from "@/src/asset/frame/image13.png";
import image18 from "@/src/asset/frame/image18.png";
import image25 from "@/src/asset/frame/image25.png";
import image12 from "@/src/asset/frame/image12.png";
import image7 from "@/src/asset/frame/image7.png";
import image9 from "@/src/asset/frame/image9.png";
import image11 from "@/src/asset/frame/image11.png";
import image8 from "@/src/asset/frame/image8.png";
import image28 from "@/src/asset/frame/image28.png";
import image22 from "@/src/asset/frame/image22.png";
export default async function Frame({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(className)} {...props}>
      <Image
        src={image10}
        width={177}
        height={125}
        placeholder="blur"
        alt="image"
        sizes="177px"
        className="absolute top-[130px] left-[0px] object-cover"
      />
      <Image
        src={image14}
        width={129}
        height={137}
        placeholder="blur"
        alt="image"
        sizes="137px"
        className="absolute top-[118px] left-[186px] object-cover"
      />
      <Image
        src={image3}
        width={190}
        height={150}
        placeholder="blur"
        alt="image"
        sizes="190px"
        className="absolute top-[106px] left-[326px] object-cover"
      />
      <Image
        src={image23}
        width={175}
        height={138}
        placeholder="blur"
        alt="image"
        sizes="175px"
        className="absolute top-[118px] left-[526px] object-cover"
      />
      <Image
        src={image21}
        width={190}
        height={150}
        placeholder="blur"
        alt="image"
        sizes="190px"
        className="absolute top-[106px] left-[710px] object-cover"
      />
      <Image
        src={image5}
        width={115}
        height={147}
        placeholder="blur"
        alt="image"
        sizes="147px"
        className="absolute top-[109px] left-[910px] object-cover"
      />
      <Image
        src={image19}
        width={133}
        height={126}
        placeholder="blur"
        alt="image"
        sizes="133px"
        className="absolute top-[130px] left-[1034px] object-cover"
      />
      <Image
        src={image29}
        width={230}
        height={126}
        placeholder="blur"
        alt="image"
        sizes="230px"
        className="absolute top-[150px] left-[1174px] object-cover"
      />
      <Image
        src={image2}
        width={177}
        height={121}
        placeholder="blur"
        alt="image"
        sizes="177px"
        className="absolute top-[270px] left-[-40px] object-cover"
      />
      <Image
        src={image30}
        width={177}
        height={117}
        placeholder="blur"
        alt="image"
        sizes="177px"
        className="absolute top-[270px] left-[146px] object-cover"
      />
      <Image
        src={image26}
        width={177}
        height={146}
        placeholder="blur"
        alt="image"
        sizes="177px"
        className="absolute top-[270px] left-[304px] object-cover"
      />
      <Image
        src={image27}
        width={698}
        height={403}
        placeholder="blur"
        alt="image"
        sizes="698px"
        priority
        className="absolute top-[270px] left-[490px] object-cover"
      />
      <Image
        src={image13}
        width={225}
        height={300}
        placeholder="blur"
        alt="image"
        sizes="300px"
        className="absolute top-[270px] left-[1196px] object-cover"
      />
      <Image
        src={image18}
        width={177}
        height={177}
        placeholder="blur"
        alt="image"
        sizes="180px"
        className="absolute top-[404px] left-[-40px] object-cover"
      />
      <Image
        src={image25}
        width={147}
        height={142}
        placeholder="blur"
        alt="image"
        sizes="150px"
        className="absolute top-[404px] left-[146px] object-cover"
      />
      <Image
        src={image12}
        width={188}
        height={230}
        placeholder="blur"
        alt="image"
        sizes="230px"
        className="absolute top-[430px] left-[294px] object-cover"
      />
      <Image
        src={image7}
        width={148}
        height={230}
        placeholder="blur"
        alt="image"
        sizes="230px"
        className="absolute top-[594px] left-[-20px] object-cover"
      />
      <Image
        src={image9}
        width={148}
        height={230}
        placeholder="blur"
        alt="image"
        sizes="230px"
        className="absolute top-[554px] left-[138px] object-cover"
      />
      <Image
        src={image11}
        width={272}
        height={193}
        placeholder="blur"
        alt="image"
        sizes="280px"
        className="absolute top-[744px] left-[138px] object-cover"
      />
      <Image
        src={image8}
        width={123}
        height={193}
        placeholder="blur"
        alt="image"
        sizes="200px"
        className="absolute top-[734px] left-[418px] object-cover"
      />
      <Image
        src={image28}
        width={480}
        height={165}
        placeholder="blur"
        alt="image"
        sizes="480px"
        className="absolute top-[684px] left-[550px] object-cover"
      />
      <Image
        src={image22}
        width={240}
        height={165}
        placeholder="blur"
        alt="image"
        sizes="240px"
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
