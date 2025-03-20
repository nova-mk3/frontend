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
import { formatPhoneNumber, formatBirthday } from "../../../../apps/admin/src/utils/formatter";
// 성민이형의 고양이사진 임시로 사용
import TempImageLink from "./../../../../apps/service/public/image/cat.jpg";

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
} : MembercardProps) {
    if(type === "small"){
        return (
            <div onClick={onClick} className={`w-[200px] h-[80px] m-[8px] flex border border-primary rounded-lg items-center hover:bg-background02 cursor-pointer`}>
                <Image 
                    src={TempImageLink} 
                    alt="profileImage" 
                    width={0}
                    height={0}
                    className='ml-[15px] rounded-full h-[64px] w-[64px]'
                    priority
                />
                <div className={`text-2xl text-center flex-grow`}>{name}</div>
            </div>
        )
    }else if(type === "medium"){
        return (
            <div onClick={onClick} className={`w-[600px] h-[80px] m-[8px] flex border border-primary rounded-lg items-center hover:bg-background02 cursor-pointer`}>
                <Image 
                    src={TempImageLink} 
                    alt="profileImage" 
                    width={0}
                    height={0}
                    className='ml-[15px] rounded-full h-[64px] w-[64px]'
                    priority
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
                    src={TempImageLink} 
                    alt="profileImage" 
                    width={0}
                    height={0}
                    className='ml-[15px] rounded-full h-[100px] w-[100px]'
                    priority
                />
                <div className={`text-2xl text-center flex-grow`}>{name}</div>
                <Phone className={"ml-auto h-8 w-8"}/>
                <div className={`text-2xl text-center flex-grow`}>{formatPhoneNumber(phoneNumber)}</div>
                <IdCard className={"ml-auto h-8 w-8"}/>
                <div className={`text-2xl text-center flex-grow`}>{studentId}</div>
                <Cake className={"ml-auto h-8 w-8"}/>
                <div className={`text-2xl text-center flex-grow`}>{formatBirthday(birthday)}</div>
                <Mail className={"ml-auto h-8 w-8"}/>
                <div className={`text-2xl text-center flex-grow`}>{email}</div>
                <div className={`text-2xl text-center flex-grow`}>{grade}학년</div>
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
