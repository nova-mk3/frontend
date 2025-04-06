// ExecutiveMemberCard
import { 
    Phone,
    IdCard,
} from "lucide-react";
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue 
} from "@nova/ui/components/ui/select";
import { enumRoleType , ExecutiveMembercardProps, ROLE_LABELS } from '@/src/types/executiveMember';
import { useDeleteExecutiveMemberMutation, usePutExecutiveMemberMutation } from '@/src/query/executiveMembersQueries';
import { ProfileImage } from '@nova/ui/components/ui/profileImage';

export default function ExecutiveMembercard({
    selectedYear = 0,
    name = "고양이" ,
    phone = "010-0000-0000" ,
    studentId="2019019014" ,
    executiveHistoryId="00000000",
    role= enumRoleType.EXECUTIVE,
    profilePhoto = {
        imageUrl: "test",
        id: "00000000",
        originalFileName: "cat.png",
    }
} : ExecutiveMembercardProps) {
    const { mutate: putExectuvieMemberMutation } = usePutExecutiveMemberMutation(selectedYear);
    const { mutate: deleteExecutiveMember } = useDeleteExecutiveMemberMutation(selectedYear);

    return (
        <div className={`w-[650px] h-[80px] m-[8px] flex border border-primary rounded-lg items-center hover:bg-background02 cursor-pointer`}>
            <ProfileImage src={profilePhoto.imageUrl} size={64} className='ml-[15px]'/>
            <div className={`text-2xl text-center flex-grow`}>{name}</div>
            <Phone className={"ml-auto h-8 w-8"}/>
            <div className={`text-2xl text-center flex-grow`}>{phone}</div>
            <IdCard className={"ml-auto h-8 w-8"}/>
            <div className={`text-2xl text-center flex-grow`}>{studentId}</div>
            <Select 
                onValueChange={(value) =>{
                    if(value ==='delete'){
                        deleteExecutiveMember(executiveHistoryId)
                    }else{
                        putExectuvieMemberMutation({ executiveHistoryId, role: value as enumRoleType });
                    }
                }}
            >
                <SelectTrigger className="w-[90px] mr-[10px]">
                    <SelectValue placeholder={ROLE_LABELS[role]} /> 
                </SelectTrigger>
                <SelectContent className="bg-background01" style={{minWidth: "90px"}}>
                    <SelectItem value={enumRoleType.CHAIRMAN} className="cursor-pointer">
                        회장
                    </SelectItem>
                    <SelectItem value={enumRoleType.VICE_CHAIRMAN} className="cursor-pointer">
                        부회장
                    </SelectItem>                        
                    <SelectItem value={enumRoleType.EXECUTIVE} className="cursor-pointer">
                        임원
                    </SelectItem>
                    <SelectItem value={enumRoleType.ADMINISTRATOR} className="cursor-pointer">
                        서버관리자
                    </SelectItem>
                    <SelectItem value="delete" className="cursor-pointer">
                        삭제
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}
