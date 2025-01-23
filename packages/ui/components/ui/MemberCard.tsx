// MemberCard
// 타입에 따라 MeberCard-small, MemberCard-medium, MemberCard-large로 나누어서 사용
import React from 'react'
import Image from 'next/image';
import { 
    Phone,
    IdCard,
    Cake,
    Mail, 
} from "lucide-react";
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue 
} from "@nova/ui/components/ui/select";
import { Button } from "@nova/ui/components/ui/button";

// 성민이형의 고양이사진 임시로 사용
import TempImageLink from "./../../../../apps/service/public/image/cat.jpg";

interface MembercardProps {
    type? : "small" | "medium" | "large" | "admin",
    name? : string,
    image? : string,
    studentId? : string,
    phoneNumber? : string,
    birthday? : string,
    email? : string,
    grade? : string,
}

export default function MemberCard({
    name = "고양이" , type = "small" , phoneNumber = "010-0000-0000" , studentId="2019019014" , birthday="2000-01-01" , email="CatHolic@chungbuk.ac.kr", grade="1학년"
} : MembercardProps) {
    if(type === "small"){
        return (
            <div className={`w-[200px] h-[80px] m-[8px] flex border border-primary rounded-lg items-center hover:bg-background02 cursor-pointer`}>
                <Image 
                    src={TempImageLink} 
                    alt="profileImage" 
                    width={0}
                    height={0}
                    className='ml-[15px] rounded-full h-[64px] w-[64px]'
                />
                <div className={`text-2xl text-center flex-grow`}>{name}</div>
            </div>
        )
    }else if(type === "medium"){
        return (
            <div className={`w-[600px] h-[80px] m-[8px] flex border border-primary rounded-lg items-center hover:bg-background02 cursor-pointer`}>
                <Image 
                    src={TempImageLink} 
                    alt="profileImage" 
                    width={0}
                    height={0}
                    className='ml-[15px] rounded-full h-[64px] w-[64px]'
                />
                <div className={`text-2xl text-center flex-grow`}>{name}</div>
                <Phone className={"ml-auto h-8 w-8"}/>
                <div className={`text-2xl text-center flex-grow`}>{phoneNumber}</div>
                <IdCard className={"ml-auto h-8 w-8"}/>
                <div className={`text-2xl text-center flex-grow`}>{studentId}</div>
            </div>
        )
    }else if(type === "admin"){
        return (
            <div className={`w-[700px] h-[80px] m-[8px] flex border border-primary rounded-lg items-center hover:bg-background02 cursor-pointer`}>
                <Image 
                    src={TempImageLink} 
                    alt="profileImage" 
                    width={0}
                    height={0}
                    className='ml-[15px] rounded-full h-[64px] w-[64px]'
                />
                <div className={`text-2xl text-center flex-grow`}>{name}</div>
                <Phone className={"ml-auto h-8 w-8"}/>
                <div className={`text-2xl text-center flex-grow`}>{phoneNumber}</div>
                <IdCard className={"ml-auto h-8 w-8"}/>
                <div className={`text-2xl text-center flex-grow`}>{studentId}</div>
                <Select>
                    <SelectTrigger className="w-[90px] mr-[10px]">
                        <SelectValue placeholder="직위 변경" />
                    </SelectTrigger>
                    <SelectContent className="bg-background01" style={{minWidth: "90px"}}>
                        <SelectItem value="회장" className="cursor-pointer">
                            회장
                        </SelectItem>
                        <SelectItem value="부회장" className="cursor-pointer">
                            부회장
                        </SelectItem>                        
                        <SelectItem value="임원" className="cursor-pointer">
                            임원
                        </SelectItem>
                        <SelectItem value="delete" className="cursor-pointer">
                            삭제
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
        )
    }else if(type === "large"){
        return (
            <div className={`w-[1400px] h-[160px] m-[8px] flex border border-primary rounded-lg items-center hover:bg-background02 cursor-pointer`}>
                <Image 
                    src={TempImageLink} 
                    alt="profileImage" 
                    width={0}
                    height={0}
                    className='ml-[15px] rounded-full h-[100px] w-[100px]'
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
                <Button
                    type="button"
                    variant={"default"}
                    size={"sm"}
                    style={{width:"72px", marginRight:"10px"}}
                >
                    수락
                </Button>
                <Button
                    type="button"
                    variant={"default"}
                    size={"sm"}
                    style={{width:"72px", marginRight:"10px"}}
                >
                    반려
                </Button>
            </div>
        )
    }
}
