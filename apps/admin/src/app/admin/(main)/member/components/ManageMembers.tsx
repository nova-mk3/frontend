// ManageMembers.tsx
import MemberCard from "@nova/ui/components/ui/MemberCard";
import { Input } from "@nova/ui/components/ui/input";
import { Button } from "@nova/ui/components/ui/button";
import { useEffect, useState } from "react";
import ManageMemberCardModal from "./ManageMemberCardModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@nova/ui/components/ui/select";
import {
  useManageMembersQuery,
  usePutAllMemberSemesterMutation,
  usePutMemberGradeMutation,
  usePutMemberAbsenceMutation,
  usePutMemberGraduationMutation,
} from "@/src/query/manageMembersQueries";
import { formatPhoneNumber } from "@/src/utils/formatter";
import { ManageMember } from "@/src/types/manageMember";

export default function ManageMembers() {
  const { data, isLoading, error } = useManageMembersQuery();
  const { mutate: putAllMemberSemesterMutation } = usePutAllMemberSemesterMutation();
  const { mutate: putMemberGrade } = usePutMemberGradeMutation();
  const { mutate: putMemberAbsence } = usePutMemberAbsenceMutation();
  const { mutate: putMemberGraduation } = usePutMemberGraduationMutation();

  const [viewType, setViewType] = useState<"small" | "medium">("small");
  const [open, setOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [members, setMembers] = useState<ManageMember[]>([]);
  const [draggedMemberId, setDraggedMemberId] = useState<string>("");

  useEffect(() => {
    if (data) {
      setMembers(data);
    }
  }, [data]);

  const filteredMembers = !searchText
    ? members
    : members.filter((member) =>
        member.name.toLowerCase().includes(searchText.toLowerCase())
      );

  const grades = ["1학년", "2학년", "3학년", "4학년", "초과 학기", "휴학생", "졸업생"];

  const categories = grades.map((grade) => ({
    title: grade,
    members: filteredMembers.filter((member) => {
      if (grade === "휴학생") return member.absence && !member.graduation;
      if (grade === "졸업생") return member.graduation;
      return member.grade === grade && !member.absence && !member.graduation;
    }),
  }));

  const DownloadExcel = () => {
    console.log("엑셀 다운로드");
  };

  const handleDrop = (grade: string) => {
    if (!draggedMemberId) return;

    const member = members.find((m) => m.memberId === draggedMemberId);
    if (!member) return;

    const gradeToNumber = (grade: string): number => {
      switch (grade) {
        case "1학년": return 1;
        case "2학년": return 2;
        case "3학년": return 3;
        case "4학년": return 4;
        case "초과 학기": return 5;
        default: return 0;
      }
    };

    if (grade === "휴학생") {
      if (!member.absence) {
        putMemberAbsence({ memberId: draggedMemberId, absence: true });
      }
      setMembers((prev) =>
        prev.map((m) =>
          m.memberId === draggedMemberId ? { ...m, absence: true } : m
        )
      );
    } else if (grade === "졸업생") {
      if (!member.graduation) {
        putMemberGraduation({ memberId: draggedMemberId, Graduation: true });
      }
      setMembers((prev) =>
        prev.map((m) =>
          m.memberId === draggedMemberId ? { ...m, graduation: true } : m
        )
      );
    } else {
      const newGrade = gradeToNumber(grade);
      if (member.grade !== grade) {
        putMemberGrade({ memberId: draggedMemberId, grade: newGrade });
      }
      if (member.absence) {
        putMemberAbsence({ memberId: draggedMemberId, absence: false });
      }
      if (member.graduation) {
        putMemberGraduation({ memberId: draggedMemberId, Graduation: false });
      }
      setMembers((prev) =>
        prev.map((m) =>
          m.memberId === draggedMemberId
            ? { ...m, grade, absence: false, graduation: false }
            : m
        )
      );
    }
    setDraggedMemberId("");
  };

  if (isLoading) return <div className="m-4">불러오는 중...</div>;
  if (error)
    return <div className="m-4 text-red-500">에러 발생: {String(error)}</div>;

  return (
    <div className="font-pretendard">
      <div className="flex m-4 w-[1400px]">
        <Select
          value={viewType}
          onValueChange={(value) => setViewType(value as "small" | "medium")}
        >
          <SelectTrigger className="w-[100px] mr-[10px]">
            <SelectValue>
              {viewType === "small" ? "작게보기" : "크게보기"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-background01">
            <SelectItem value="small">작게 보기</SelectItem>
            <SelectItem value="medium">크게 보기</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex flex-row items-center gap-[15px] w-[200px]">
          <Input
            placeholder="이름으로 검색하기"
            className="w-[250px] h-[36px] px-2 py-1 rounded-lg flex-1"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="flex flex-row items-center gap-[15px] ml-auto">
          <Button onClick={() => putAllMemberSemesterMutation()}>
            전체 재학생 학기 증가
          </Button>
          <Button onClick={DownloadExcel}>To Excel</Button>
        </div>
      </div>

      {categories.map(({ title, members }) => (
        <div
          key={title}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(title)}
          className="border-2 border-dashed border-gray-300 rounded-xl p-2 m-4"
        >
          <div className="text-lg font-bold ml-2">
            {title} - {members.length}명
          </div>
          <div className="flex flex-wrap ml-2 min-h-[50px]">
            {members.length > 0 ? (
              members.map((member) => (
                <div
                  key={`${title}-${member.memberId}`}
                  draggable
                  onDragStart={() => setDraggedMemberId(member.memberId)}
                >
                  <MemberCard
                    name={member.name}
                    phoneNumber={formatPhoneNumber(member.phone)}
                    studentId={member.studentNumber}
                    profilePhoto={member.profilePhoto}
                    type={viewType}
                    onClick={() => {
                      setOpen(true);
                      setSelectedMemberId(member.memberId);
                    }}
                  />
                </div>
              ))
            ) : (
              <div className="text-gray-500 m-2">등록된 학생이 없습니다.</div>
            )}
          </div>
        </div>
      ))}

      <ManageMemberCardModal
        memberId={selectedMemberId}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
