import Image from 'next/image';
import { 
    Phone,
    IdCard,
    Cake,
    Mail, 
} from "lucide-react";
import { Button } from "@nova/ui/components/ui/button";
import { ProfilePhoto } from '@/src/types/manageMember';


interface PendingMembercardProps {
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
    profilePhoto: ProfilePhoto,
}

export default function PendingMembercard({
    name = "고양이" ,
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
        imageUrl: "test",
        id: "00000000",
        originalFileName: "cat.png",
    },
} : PendingMembercardProps) {
    return (
        <div onClick={onClick} className={`w-[1400px] h-[160px] m-[8px] flex border border-primary rounded-lg items-center hover:bg-background02 cursor-pointer`}>
            <Image 
                src={profilePhoto.imageUrl} 
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