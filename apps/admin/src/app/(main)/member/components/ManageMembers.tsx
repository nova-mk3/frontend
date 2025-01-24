// Members 페이지
import MemberCard from "@nova/ui/components/ui/MemberCard";
import { Input } from "@nova/ui/components/ui/input";
import { Button } from "@nova/ui/components/ui/Button";
import { useEffect, useState } from "react";
import { membersData } from "./memberTempData";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@nova/ui/components/ui/select";

interface Member {
  studentId: string;
  name: string;
  birthday: string;
  phoneNumber: string;
  email: string;
  grade: string;
  image?: string;
}

// TODO : 검색구현 ->  검색은 아래의 filter를 사용하여 검색하는걸로 구현

export default function ManageMembers() {
  const [data, setData] = useState<Member[]>([]);

  useEffect(() => {
    // API 연동 위치
    setData(membersData);
  }, []);

  // 카테고리별 데이터 분류
  const categories = [
    { title: "1학년", members: data.filter(member => member.grade === "1학년") },
    { title: "2학년", members: data.filter(member => member.grade === "2학년") },
    { title: "3학년", members: data.filter(member => member.grade === "3학년") },
    { title: "4학년", members: data.filter(member => member.grade === "4학년") },
    { title: "초과학기", members: data.filter(member => member.grade === "초과학기") },
    { title: "휴학생", members: data.filter(member => member.grade === "휴학") },
    { title: "졸업생", members: data.filter(member => member.grade === "졸업") },
  ];

  return (
    <div className="font-pretendard">
      <div className="flex m-4 w-[1400px]">
        <Select>
            <SelectTrigger className="w-[100px] mr-[10px]">
                <SelectValue placeholder="작게 보기" />
            </SelectTrigger>
            <SelectContent className="bg-background01" style={{minWidth: "100px"}}>
                <SelectItem value="small" className="cursor-pointer">
                    작게 보기
                </SelectItem>
                <SelectItem value="big" className="cursor-pointer">
                    크게 보기
                </SelectItem>                        
            </SelectContent>
        </Select>
        <div className="flex flex-row items-center gap-[15px] w-[200px]">
          <Input
            placeholder="이름으로 검색하기"
            className="w-[250px] h-[36px] px-2 py-1 rounded-lg flex-1"
          />
        </div>
        <div className="flex flex-row items-center gap-[15px] ml-auto">
          <Button className="ml-2">전체 학년 증가</Button>
          <Button className="ml-2">To Excel</Button>
          <Button className="ml-2">변경 저장</Button>
          <Button className="ml-2" variant={"text"}>변경 취소</Button>
        </div>
      </div>
      {categories.map(({ title, members }) => (
        <div key={title} className="">
          <div className="text-lg font-bold ml-4">
            {title} - {members.length}명
          </div>
          <div className="flex flex-wrap">
            {members.length > 0 ? (
              members.map(member => (
                <MemberCard
                  key={member.studentId}
                  name={member.name}
                  type="small"
                />
              ))
            ) : (
              <div className="text-gray-500">등록된 학생이 없습니다.</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
