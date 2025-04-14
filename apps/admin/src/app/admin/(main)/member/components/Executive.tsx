import { Button } from "@nova/ui/components/ui/button";
import { useEffect, useState } from "react";
import ExecutiveModal from './ExecutiveModal';
import {
  useDeleteExecutiveYearMutation,
  useExecutiveMembersQuery,
  useExecutiveYearsQuery,
  usePostExecutiveYearMutation,
  usePutExecutiveMemberMutation,
} from "@/src/query/executiveMembersQueries";
import { enumRoleType } from "@/src/types/executiveMember";
import ExecutiveMembercard from "./ExecutiveMemberCard";
import { formatPhoneNumber } from "@/src/utils/formatter";

export default function Executive() {
  const [selectedYear, setSelectedYear] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [draggedInfo, setDraggedInfo] = useState<{ id: string; role: enumRoleType } | null>(null);

  const { data: executiveYears, isLoading: isYearsLoading, isError: isYearsError } = useExecutiveYearsQuery();
  const { data: executiveMembers, isLoading: isMembersLoading, isError: isMembersError } = useExecutiveMembersQuery(selectedYear);
  const { mutate: postExecutiveYear } = usePostExecutiveYearMutation();
  const { mutate: deleteExecutiveYear } = useDeleteExecutiveYearMutation();
  const { mutate: putExecutiveRole } = usePutExecutiveMemberMutation(selectedYear);

  useEffect(() => {
    if (executiveYears && executiveYears.length > 0) {
      const maxYear = Math.max(...executiveYears);
      setSelectedYear(maxYear);
    }
  }, [executiveYears]);

  const handleDrop = (role: enumRoleType) => {
    if (!draggedInfo || draggedInfo.role === role) return;
    putExecutiveRole({ executiveHistoryId: draggedInfo.id, role });
    setDraggedInfo(null);
  };

  const categories = [
    { title: "회장", role: enumRoleType.CHAIRMAN },
    { title: "부회장", role: enumRoleType.VICE_CHAIRMAN },
    { title: "서버관리자", role: enumRoleType.ADMINISTRATOR },
    { title: "임원", role: enumRoleType.EXECUTIVE },
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
                className={`mr-2 w-[100px] ${selectedYear === year ? "bg-text02 hover:bg-text02" : "bg-line01 hover:bg-text02"}`}
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
                }
              }}
            >
              연도 추가
            </Button>
            <Button
              variant="text"
              className="w-[100px]"
              onClick={() => {
                if (window.confirm("연도를 삭제하시겠습니까?\n삭제된 연도의 임원 권한들이 사라집니다.")) {
                  deleteExecutiveYear();
                }
              }}
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
        categories.map(({ title, role }) => {
          const members = executiveMembers?.filter((member) => member.role === role) ?? [];
          return (
            <div
              key={title}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(role)}
              className="border-2 border-dashed border-gray-300 rounded-xl p-2 m-4"
            >
              <div className="text-lg font-bold ml-4">{title}</div>
              <div className="flex flex-wrap ml-2 min-h-[80px]">
                {members.length > 0 ? (
                  members.map((member) => (
                    <div
                      key={member.executiveHistoryId}
                      draggable
                      onDragStart={() =>
                        setDraggedInfo({
                          id: member.executiveHistoryId,
                          role: member.role,
                        })
                      }
                    >
                      <ExecutiveMembercard
                        selectedYear={selectedYear}
                        name={member.name}
                        phone={formatPhoneNumber(member.phone)}
                        studentId={member.studentNumber}
                        role={member.role}
                        executiveHistoryId={member.executiveHistoryId}
                        profilePhoto={member.profilePhoto}
                      />
                    </div>
                  ))
                ) : (
                  <div className="flex items-center flex items-center text-center text-2xl text-gray-500 m-2 w-[650px] h-[80px]">
                    등록된 임원이 없습니다.
                  </div>
                )}
                {role === enumRoleType.EXECUTIVE && (
                  <Button className="ml-2 mt-2 w-[650px] h-[80px] text-2xl" onClick={() => setOpen(true)}>
                    + 임원 추가
                  </Button>
                )}
              </div>
            </div>
          );
        })
      )}

      <ExecutiveModal year={selectedYear} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
