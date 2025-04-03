// Members 페이지
import { Button } from "@nova/ui/components/ui/button";
import { useEffect, useState } from "react";
import ExecutiveModal from './ExecutiveModal';
import { useDeleteExecutiveYearMutation, useExecutiveMembersQuery, useExecutiveYearsQuery , usePostExecutiveYearMutation} from "@/src/query/executiveMembersQueries";
import { enumRoleType } from "@/src/types/executiveMember";
import ExecutiveMembercard from "./ExecutiveMemberCard";
import { formatPhoneNumber } from "@/src/utils/formatter";

export default function Executive() {
  const [selectedYear, setSelectedYear] = useState<number>(0);
  const [open, setOpen] = useState(false);

  const { data: executiveYears, isLoading: isYearsLoading, isError: isYearsError } = useExecutiveYearsQuery();
  const { data: executiveMembers, isLoading: isMembersLoading, isError: isMembersError } = useExecutiveMembersQuery(selectedYear);
  const { mutate: postExecutiveYear } = usePostExecutiveYearMutation();
  const { mutate: deleteExecutiveYear } = useDeleteExecutiveYearMutation();

  useEffect(() => {
    if (executiveYears && executiveYears.length > 0) {
      const maxYear = Math.max(...executiveYears);
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
      <div className="flex m-4 w-[1400px]">
        {isYearsLoading ? (
          <div className="text-gray-500 text-lg">연도 데이터를 불러오는 중입니다...</div>
        ) : isYearsError ? (
          <div className="text-red-500 text-lg">연도 데이터를 불러오지 못했습니다.</div>
        ) : (
          <>
            {executiveYears?.map((year) => (
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
            <Button
              variant="default" 
              className="mr-2 w-[100px]"
              onClick={() => {
                if (window.confirm("연도를 추가하시겠습니까?\n새로 추가시 현재 임원들은 권한을 잃습니다.")) {
                  postExecutiveYear();
                }}}
            >
              연도 추가
            </Button>
            <Button 
              variant="text" 
              className="w-[100px]" 
              onClick={() => {
                if (window.confirm("연도를 삭제하시겠습니까?\n삭제된 연도의 임원 권한들이 사라집니다.")){
                  deleteExecutiveYear()
                }}}
              >
              연도 삭제
            </Button>
          </>
        )}
      </div>

      {isMembersLoading ? (
        <div className="text-gray-500 text-lg ml-4">임원 정보를 불러오는 중입니다...</div>
      ) : isMembersError ? (
        <div className="text-red-500 text-lg ml-4">임원 정보를 불러오지 못했습니다.</div>
      ) : (
        categories.map(({ title, members }) => (
          <div key={title} className="mb-8">
            <div className="text-lg font-bold ml-4">{title}</div>
            <div className="flex flex-wrap ml-2">
              {(members ?? []).length > 0 ? (
                members?.map(member => (
                  <ExecutiveMembercard
                    selectedYear={selectedYear}
                    key={member.executiveHistoryId}
                    name={member.name}
                    phone={formatPhoneNumber(member.phone)}
                    role={member.role}
                    executiveHistoryId={member.executiveHistoryId}
                    profilePhoto={member.profilePhoto}
                  />
                ))
              ) : (
                <div className="flex items-center text-2xl text-gray-500 m-2 w-[650px] h-[80px] ">등록된 임원이 없습니다.</div>
              )}
              {title === "임원" && (
                <Button className="ml-2 mt-2 w-[650px] h-[80px] text-2xl" onClick={() => setOpen(true)}>
                  + 임원 추가
                </Button>
              )}
            </div>
          </div>
        ))
      )}

      <ExecutiveModal year={selectedYear} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
