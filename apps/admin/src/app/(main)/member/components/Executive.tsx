// Members 페이지
import MemberCard from "@nova/ui/components/ui/MemberCard";
import { Button } from "@nova/ui/components/ui/button";
import { useEffect, useState } from "react";
import ExecutiveModal from './ExecutiveModal';
import { useExecutiveMembersQuery, useExecutiveYearsQuery , useDeleteExecutiveMemberMutation , usePostExecutiveYearMutation} from "@/src/query/executiveMembersQueries";
import { enumRoleType } from "@/src/types/executiveMember";

export default function Executive() {
  const [selectedYear, setSelectedYear] = useState<number>(0); // 선택된 연도 상태
  const [open, setOpen] = useState(false);
  const { data : executiveYears , isLoading : isYearsLoading , error : yearsError } = useExecutiveYearsQuery();
  const { data : executiveMembers , isLoading : isMembersLoading , error :membersError } = useExecutiveMembersQuery(selectedYear);
  const { mutate: deleteExecutiveMember } = useDeleteExecutiveMemberMutation(selectedYear);
  const { mutate: PostExecutiveYearMutation } = usePostExecutiveYearMutation();

  useEffect(() => {
    if (executiveYears && executiveYears.length > 0) {
      const maxYear = Math.max(...executiveYears);
      console.log(executiveYears)
      setSelectedYear(maxYear);
    }
  }, [executiveYears]);
  
  const categories = [
    { title: "회장", members: executiveMembers?.filter(member => member.role === enumRoleType.CHAIRMAN) },
    { title: "부회장", members: executiveMembers?.filter(member => member.role === enumRoleType.VICE_CHAIRMAN) },
    { title: "서버관리자", members: executiveMembers?.filter(member => member.role === enumRoleType.ADMINISTRATOR) }, 
    { title: "임원", members: executiveMembers?.filter(member => member.role === enumRoleType.EXECUTIVE) },
  ];

  return (
    <div className="font-pretendard">
      <div className="flex m-4 w-[1500px]">
        {executiveYears?.map((year) => (
          <Button
            key={year}
            onClick={() => {
              setSelectedYear(year) 
            }}
            className={`mr-2 w-[100px] ${
              selectedYear === year ? "bg-text02 hover:bg-text02" : "bg-line01 hover:bg-text02"
            }`}
          >
            {year}
          </Button>
        ))}
        <Button variant={"default"} className="w-[100px]" onClick={()=> PostExecutiveYearMutation()}>연도 추가</Button>
      </div>

      {categories.map(({ title, members }) => (
        <div key={title} className="mb-8">
          <div className="text-lg font-bold ml-4">
            {title}
          </div>
          <div className="flex flex-wrap ml-2">
            {(members ?? []).length > 0 ? (
              members?.map(member => (
                <MemberCard
                  key={member.executiveHistoryId}
                  name={member.name}
                  onDeleteRole={()=> deleteExecutiveMember(member.executiveHistoryId)}
                  type="admin"
                />
              ))
            ) : (
              <div className="text-gray-500 m-2">등록된 임원이 없습니다.</div>
            )}
            {title === "임원" && (
              <Button className="ml-2 mt-2 w-[700px] h-[80px] text-2xl" onClick={() => setOpen(true)}>
                + 임원 추가
              </Button>
            )}
          </div>
        </div>
      ))}
      <ExecutiveModal year={selectedYear} open={open} onClose={() =>setOpen(false)}/>
    </div>
  );
}
