// Members 페이지
import MemberCard from "@nova/ui/components/ui/MemberCard";
import { Input } from "@nova/ui/components/ui/input";
import { Button } from "@nova/ui/components/ui/button";
import { useEffect, useState } from "react";
import ManageMemberCardModal from './ManageMemberCardModal';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@nova/ui/components/ui/select";
import { useManageMembersQuery , usePutAllMemberSemesterMutation } from "@/src/query/manageMembersQueries";
import { ManageMember } from '@/src/types/manageMember';
import { formatPhoneNumber } from "@/src/utils/formatter";

export default function ManageMembers() {
  const { data , isLoading , error } = useManageMembersQuery();
  const [viewData, setViewData] = useState<ManageMember[]| undefined >([]);
  const [viewType , setViewType] = useState<"small"|"medium">("small");
  const [open , setOpen] = useState(false);
  const [selctedMemberId , setSelctedMemberId] = useState<string>("");
  const [selctedMemberData , setSelctedMemberData] = useState<ManageMember| undefined>(undefined);
  const { mutate: putAllMemberSemesterMutation } = usePutAllMemberSemesterMutation();
  useEffect(() => {
    setViewData(data);
  }, [data , viewType]);

  // 카테고리별 데이터 분류
  const categories = [
    { title: "1학년", members: viewData?.filter(member => (member.grade === "1학년")&&(member.absence === false)&&(member.graduation === false)) },
    { title: "2학년", members: viewData?.filter(member => (member.grade === "2학년")&&(member.absence === false)&&(member.graduation === false)) },
    { title: "3학년", members: viewData?.filter(member => (member.grade === "3학년")&&(member.absence === false)&&(member.graduation === false)) },
    { title: "4학년", members: viewData?.filter(member => (member.grade === "4학년")&&(member.absence === false)&&(member.graduation === false)) },
    { title: "초과학기", members: viewData?.filter(member => (member.grade === "초과학기")&&(member.absence === false)&&(member.graduation === false)) },
    { title: "휴학생", members: viewData?.filter(member => (member.absence === true)) },
    { title: "졸업생", members: viewData?.filter(member => (member.graduation === true)) },
  ];

  const Search = (text : string) => {
    setViewData(data?.filter(member => member.name.includes(text)));
  }

  const DownloadExcel = () => {
    // TODO : 엑셀 다운로드 API 연동 후 적용
    console.log("엑셀 다운로드");
  }

  return (
    <div className="font-pretendard">
      <div className="flex m-4 w-[1400px]">
        <Select value={viewType} onValueChange={(value) => setViewType(value as "small" | "medium")}>
            <SelectTrigger className="w-[100px] mr-[10px]">
                <SelectValue>{viewType === "small" ? "작게보기" : "크게보기"}</SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-background01" style={{minWidth: "100px"}}>
                <SelectItem value="small" className="cursor-pointer">
                    작게 보기
                </SelectItem>
                <SelectItem value="medium" className="cursor-pointer">
                    크게 보기
                </SelectItem>                        
            </SelectContent>
        </Select>
        <div className="flex flex-row items-center gap-[15px] w-[200px]">
          <Input
            placeholder="이름으로 검색하기"
            className="w-[250px] h-[36px] px-2 py-1 rounded-lg flex-1"
            onKeyDown={(e) => e.key === "Enter" && Search((e.target as HTMLInputElement).value)}
          />
        </div>
        <div className="flex flex-row items-center gap-[15px] ml-auto">
          <Button className="ml-2" onClick={() => putAllMemberSemesterMutation()}>전체 재학생 학기 증가</Button>
          <Button className="ml-2" onClick={DownloadExcel}>To Excel</Button>
        </div>
      </div>
      {categories.map(({ title, members }) => (
        <div key={title} className="">
          <div className="text-lg font-bold ml-4">
            {title} - {members?.length}명
          </div>
          <div className="flex flex-wrap ml-2">
            {(members ?? []).length > 0 ? (
              members?.map((member) => (
                <MemberCard
                  key={member.memberId}
                  name={member.name}
                  phoneNumber={formatPhoneNumber(member.phone)}
                  studentId={member.studentNumber}
                  profilePhoto={member.profilePhoto}
                  type={viewType}
                  onClick={()=>{
                    setOpen(true)
                    setSelctedMemberId(member.memberId)
                  }}
                />
              ))
            ) : (
              <div className="text-gray-500 m-2">등록된 학생이 없습니다.</div>
            )}
          </div>
        </div>
      ))}
     <ManageMemberCardModal memberId = {selctedMemberId} open={open} onClose={()=>setOpen(false)}/>
    </div>
  );
}
