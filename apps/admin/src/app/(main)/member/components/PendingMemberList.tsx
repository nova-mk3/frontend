import { useApprovePendingMemberMutation, useRejectPendingMemberMutation } from "@/src/query/pendingMembersQueries";
import { Member } from "src/types/member";
import MemberCard from "@nova/ui/components/ui/MemberCard";

export default function PendingMemberList({ members, onClick }: { members: Member[]; onClick: (memberId: string) => void }) {
  const { mutate: approveMember } = useApprovePendingMemberMutation();
  const { mutate: rejectMember } = useRejectPendingMemberMutation();

  return (
    <div className="flex-grow">
      {members.map((member) => (
        <MemberCard
          key={member.pendingMemberId}
          pendingMemberId={member.pendingMemberId}
          studentId={member.studentNumber}
          name={member.name}
          grade={member.grade}
          phoneNumber={member.phone}
          birthday={member.birth}
          email={member.email}
          profilePhoto={member.profilePhoto}
          type="large"
          onClick={() => onClick(member.pendingMemberId)}
          onApprove={() => approveMember(member.pendingMemberId)}
          onReject={() => rejectMember(member.pendingMemberId)}
        />
      ))}
    </div>
  );
}