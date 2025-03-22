// MemberCard.tsx
import { Phone, IdCard } from "lucide-react";
import Image from "next/image";
interface ProfilePhoto {
  id: string;
  originalFileName: string;
  imageUrl: string;
}

interface MemberCardProps {
  type?: "small" | "medium";
  name?: string;
  studentId?: string;
  phoneNumber?: string;
  profilePhoto: ProfilePhoto;
  pendingMemberId?: string;
  onClick?: () => void;
}

export default function MemberCard({
  name = "고양이",
  type = "small",
  phoneNumber = "010-0000-0000",
  studentId = "2019019014",
  profilePhoto = {
    id: "00000000",
    originalFileName: "cat.png",
    imageUrl: "test",
  },
  onClick = () => console.log("meow"),
}: MemberCardProps) {
  const baseCardClass =
    "m-[8px] flex border border-primary rounded-lg items-center hover:bg-background02 cursor-pointer";

  if (type === "small") {
    return (
      <div
        onClick={onClick}
        className={`w-[200px] h-[80px] ${baseCardClass}`}
      >
        <Image 
            src={profilePhoto.imageUrl} 
            alt="profileImage" 
            width={0}
            height={0}
            className='ml-[15px] rounded-full h-[64px] w-[64px]'
            unoptimized 
        />
        <div className="text-2xl text-center flex-grow">{name}</div>
      </div>
    );
  }

  if (type === "medium") {
    return (
      <div
        onClick={onClick}
        className={`w-[600px] h-[80px] ${baseCardClass}`}
      >
        <Image 
            src={profilePhoto.imageUrl} 
            alt="profileImage" 
            width={0}
            height={0}
            className='ml-[15px] rounded-full h-[64px] w-[64px]'
            unoptimized 
        />
        <div className="text-2xl text-center flex-grow">{name}</div>
        <Phone className="ml-auto h-8 w-8" />
        <div className="text-2xl text-center flex-grow">{phoneNumber}</div>
        <IdCard className="ml-auto h-8 w-8" />
        <div className="text-2xl text-center flex-grow">{studentId}</div>
      </div>
    );
  }
}
