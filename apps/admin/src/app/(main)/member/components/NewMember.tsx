// Members 페이지
import MemberCard from "@nova/ui/components/ui/MemberCard";
import { useState, Suspense } from "react";
import MemberCardModal from "./MemberCardModal";
import { usePendingMembersQuery } from "@/src/query/pendingMembersQueries";

interface Member {
  pendingMemberId: string;
  studentNumber: string;
  name: string;
  birth: string;
  phone: string;
  email: string;
  grade: string;
  profilePhoto: {
    downloadUrl: string;
    id: string;
    originalFileName: string;
  };
}

function PendingMemberList({ members, onClick }: { members: Member[]; onClick: (memberId: string) => void }) {
  return (
    <div>
      {members.map((member) => (
        <MemberCard
          key={member.pendingMemberId}
          studentId={member.studentNumber}
          name={member.name}
          grade={member.grade}
          phoneNumber={member.phone}
          birthday={member.birth}
          email={member.email}
          profilePhoto={member.profilePhoto}
          type="large"
          onClick={() => onClick(member.pendingMemberId)}
        />
      ))}
    </div>
  );
}


function NewMembersContent() {
  const { data } = usePendingMembersQuery();
  const [open, setOpen] = useState(false);
  const [selectedPendingMemberId, setSelectedPendingMemberId] = useState<string>("");


  return (
    <div className="font-pretendard flex flex-col min-h-[700px] w-[1400px]">
      <div className="text-xl font-bold m-4">
        총 {data?.totalPendingMemberCount || 0}명
      </div>
      {data?.pendingMemberResponseList?.length ? (
        <div className="flex-grow">
          <PendingMemberList
            members={data.pendingMemberResponseList}
            onClick={(selectedPendingMemberId) => {
              setSelectedPendingMemberId(selectedPendingMemberId); 
              setOpen(true); 
            }}
          />
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center w-full">
          <div className="text-4xl font-bold text-center">신청자가 없습니다.</div>
        </div>
      )}
      <MemberCardModal open={open} onClose={() => setOpen(false)} memberId = {selectedPendingMemberId} type="newMember" /> {/* ✅ 선택된 멤버 ID 전달 */}
    </div>
  );
}

export default function NewMembers() {
  return (
    <Suspense fallback={<p className="text-center text-xl">로딩 중...</p>}>
      <NewMembersContent />
    </Suspense>
  );
}