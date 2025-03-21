// MemberCard
// 타입에 따라 MeberCard-small, MemberCard-medium, MemberCard-large로 나누어서 사용
// TODO : 수락 , 반려 API 연결 및 Image 불러오기
import Image from 'next/image';
import { 
    Phone,
    IdCard,
    Cake,
    Mail, 
} from "lucide-react";
import { Button } from "@nova/ui/components/ui/button";
import TempImageLink from "../../../../apps/admin/src/utils/tempImage.png";


interface MembercardProps {
    type? : "small" | "medium" | "large" ,
    name? : string,
    studentId? : string,
    phoneNumber? : string,
    birthday? : string,
    email? : string,
    grade? : string,
    role? : string,
    pendingMemberId?: string,
    onClick? : () => void,
    onApprove?: () => void,
    onReject?: () => void,
    profilePhoto?: {
        downloadUrl: string;
        id: string;
        originalFileName: string;
    },
}
// membercard에서 large를 분리해서 사용해야 할거같음.
export default function MemberCard({
    name = "고양이" ,
    type = "small" ,
    phoneNumber = "010-0000-0000" ,
    studentId="2019019014" ,
    birthday="2000-01-01" ,
    email="CatHolic@chungbuk.ac.kr",
    grade="1학년" ,
    pendingMemberId="00000000",
    onClick = (() => {console.log("meow")}),
    onReject = (() => {console.log("reject")}),
    onApprove = (() => {console.log("approve")}),
    profilePhoto = {
        downloadUrl: TempImageLink,
        id: "00000000",
        originalFileName: "cat.jpg",
    }
} : MembercardProps) {
    if(type === "small"){
        return (
            <div onClick={onClick} className={`w-[200px] h-[80px] m-[8px] flex border border-primary rounded-lg items-center hover:bg-background02 cursor-pointer`}>
                <ProfileImage src={profilePhoto.downloadUrl} size={64} />
                <div className={`text-2xl text-center flex-grow`}>{name}</div>
            </div>
        )
    }else if(type === "medium"){
        return (
            <div onClick={onClick} className={`w-[600px] h-[80px] m-[8px] flex border border-primary rounded-lg items-center hover:bg-background02 cursor-pointer`}>
                <Image 
                    src={profilePhoto.downloadUrl} 
                    alt="profileImage" 
                    width={0}
                    height={0}
                    className='ml-[15px] rounded-full h-[64px] w-[64px]'
                    unoptimized 
                />
                <div className={`text-2xl text-center flex-grow`}>{name}</div>
                <Phone className={"ml-auto h-8 w-8"}/>
                <div className={`text-2xl text-center flex-grow`}>{phoneNumber}</div>
                <IdCard className={"ml-auto h-8 w-8"}/>
                <div className={`text-2xl text-center flex-grow`}>{studentId}</div>
            </div>
        )
    }else if(type === "large"){
        return (
            <div onClick={onClick} className={`w-[1400px] h-[160px] m-[8px] flex border border-primary rounded-lg items-center hover:bg-background02 cursor-pointer`}>
                <Image 
                    src={profilePhoto.downloadUrl} 
                    alt="profileImage" 
                    width={0}
                    height={0}
                    className='ml-[15px] rounded-full h-[100px] w-[100px]'
                    unoptimized 
                />
                <div className={`text-2xl text-center flex-grow`}>{name}</div>
                <Phone className={"ml-auto h-8 w-8"}/>
                <div className={`text-2xl text-center flex-grow`}>{phoneNumber}</div>
                <IdCard className={"ml-auto h-8 w-8"}/>
                <div className={`text-2xl text-center flex-grow`}>{studentId}</div>
                <Cake className={"ml-auto h-8 w-8"}/>
                <div className={`text-2xl text-center flex-grow`}>{birthday}</div>
                <Mail className={"ml-auto h-8 w-8"}/>
                <div className={`text-2xl text-center flex-grow`}>{email}</div>
                <div className={`text-2xl text-center flex-grow`}>{grade}</div>
                <div onClick={(e) => e.stopPropagation()}>
                    <Button
                    type="button"
                    variant={"default"}
                    size={"sm"}
                    style={{ width: "72px", marginRight: "10px" }}
                    onClick={() => {
                        if (pendingMemberId && onApprove) {
                        onApprove();
                        }
                    }}
                    >
                    수락
                    </Button>
                    <Button
                    type="button"
                    variant={"default"}
                    size={"sm"}
                    style={{ width: "72px", marginRight: "10px" }}
                    onClick={() => {
                        if (pendingMemberId && onReject) {
                        onReject();
                        }
                    }}
                    >
                    반려
                    </Button>
                </div>
            </div>
        )
    }
}

// 아래의 코드를 분리해서 사용해야할거같음음
import { useState } from "react";

const ProfileImage = ({
  src,
  size = 64,
  alt = "프로필 이미지",
  className = "",
}: {
  src?: string;
  size?: number;
  alt?: string;
  className?: string;
}) => {
  const [imgSrc, setImgSrc] = useState(src || "");

  if (!imgSrc) {
    // src가 없으면 스켈레톤 보여주기
    return (
        <Image
            src={TempImageLink}
            alt={alt}
            width={0}
            height={0}
            unoptimized
            className={`rounded-full ml-[15px] ${className}`}
            style={{ width: `${size}px`, height: `${size}px` }}
            onError={() => setImgSrc(TempImageLink)}
        />
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={0}
      height={0}
      unoptimized
      className={`rounded-full ml-[15px] ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      onError={() => setImgSrc(TempImageLink)}
    />
  );
};
