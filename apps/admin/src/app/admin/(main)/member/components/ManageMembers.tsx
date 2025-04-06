// Members 페이지
import MemberCard from "@nova/ui/components/ui/MemberCard";
import { Input } from "@nova/ui/components/ui/input";
import { Button } from "@nova/ui/components/ui/button";
import { useState } from "react";
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
} from "@/src/query/manageMembersQueries";
import { formatPhoneNumber } from "@/src/utils/formatter";

export default function ManageMembers() {
  const { data, isLoading, error } = useManageMembersQuery();
  const { mutate: putAllMemberSemesterMutation } = usePutAllMemberSemesterMutation();
  const [viewType, setViewType] = useState<"small" | "medium">("small");
  const [open, setOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");

  const filteredData = !searchText
    ? data
    : data?.filter((member) =>
        member.name.toLowerCase().includes(searchText.toLowerCase())
      );

  const categories = [
    {
      title: "1학년",
      members: filteredData?.filter(
        (member) =>
          member.grade === "1학년" && !member.absence && !member.graduation
      ),
    },
    {
      title: "2학년",
      members: filteredData?.filter(
        (member) =>
          member.grade === "2학년" && !member.absence && !member.graduation
      ),
    },
    {
      title: "3학년",
      members: filteredData?.filter(
        (member) =>
          member.grade === "3학년" && !member.absence && !member.graduation
      ),
    },
    {
      title: "4학년",
      members: filteredData?.filter(
        (member) =>
          member.grade === "4학년" && !member.absence && !member.graduation
      ),
    },
    {
      title: "초과 학기",
      members: filteredData?.filter(
        (member) =>
          member.grade === "초과 학기" && !member.absence && !member.graduation
      ),
    },
    {
      title: "휴학생",
      members: filteredData?.filter((member) => member.absence),
    },
    {
      title: "졸업생",
      members: filteredData?.filter((member) => member.graduation),
    },
  ];

  const DownloadExcel = () => {
    // TODO : 엑셀 다운로드 API 연동 후 적용
    console.log("엑셀 다운로드");
  };

  // 🔄 로딩 & 에러 처리
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
          <SelectContent
            className="bg-background01"
            style={{ minWidth: "100px" }}
          >
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
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="flex flex-row items-center gap-[15px] ml-auto">
          <Button
            className="ml-2"
            onClick={() => putAllMemberSemesterMutation()}
          >
            전체 재학생 학기 증가
          </Button>
          <Button className="ml-2" onClick={DownloadExcel}>
            To Excel
          </Button>
        </div>
      </div>

      {categories.map(({ title, members }) => (
        <div key={title} className="">
          <div className="text-lg font-bold ml-4">
            {title} - {members?.length ?? 0}명
          </div>
          <div className="flex flex-wrap ml-2">
            {(members ?? []).length > 0 ? (
              members?.map((member) => (
                <MemberCard
                  key={`${title}-${member.memberId}`}
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
