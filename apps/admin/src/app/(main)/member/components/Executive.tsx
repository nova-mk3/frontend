// Members 페이지
import MemberCard from "@nova/ui/components/ui/MemberCard";
import { Button } from "@nova/ui/components/ui/button";
import { useEffect, useState } from "react";
import { executiveYear , executiveData  } from "./memberTempData";
import ExecutiveModal from './ExecutiveModal';

interface Member {
  studentId: string;
  name: string;
  birthday: string;
  phoneNumber: string;
  email: string;
  grade: string;
  image?: string;
  executivetype: string;
}

interface Year {
  year: number;
}

export default function Executive() {
  const [years, setYears] = useState<Year[]>([]);
  const [data, setData] = useState<Member[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null); // 선택된 연도 상태
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setYears(executiveYear);
    setData(executiveData);
    if (executiveYear.length > 0) {
      const maxYear = Math.max(...executiveYear.map(({ year }) => year));
      setSelectedYear(maxYear);
    }
  }, []);

  const categories = [
    { title: "회장", members: data.filter(member => member.executivetype === "회장") },
    { title: "부회장", members: data.filter(member => member.executivetype === "부회장") },
    { title: "임원", members: data.filter(member => member.executivetype === "임원") },
  ];

  return (
    <div className="font-pretendard">
      <div className="flex m-4 w-[1400px]">
        {years.map(({ year }) => (
          <Button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`mr-2 w-[100px] ${
              selectedYear === year ? "bg-text02 hover:bg-text02" : "bg-line01 hover:bg-text02"
            }`}
          >
            {year}
          </Button>
        ))}
        <Button variant={"default"} className="w-[100px]">연도 추가</Button>
      </div>

      {categories.map(({ title, members }) => (
        <div key={title} className="mb-8">
          <div className="text-lg font-bold ml-4">
            {title}
          </div>
          <div className="flex flex-wrap">
            {members.length > 0 ? (
              members.map(member => (
                <MemberCard
                  key={member.studentId}
                  name={member.name}
                  type="admin"
                />
              ))
            ) : (
              <div className="text-gray-500">등록된 임원이 없습니다.</div>
            )}
            {title === "임원" && (
              <Button className="ml-2 mt-2 w-[700px] h-[80px] text-2xl" onClick={() => setOpen(true)}>
                + 임원 추가
              </Button>
            )}
          </div>
        </div>
      ))}
      <ExecutiveModal year={1} open={open} onClose={() =>setOpen(false)}/>
    </div>
  );
}
