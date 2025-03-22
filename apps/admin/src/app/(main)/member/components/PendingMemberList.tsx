import { useApprovePendingMemberMutation, useRejectPendingMemberMutation } from "@/src/query/pendingMembersQueries";
import { PendingMemberResponse } from "@/src/types/pendingMember";
import PendingMemberCard from "@/src/app/(main)/member/components/PendingMemberCard";
import { formatBirthday, formatPhoneNumber } from '@/src/utils/formatter';

export default function PendingMemberList({ members, onClick }: { members: PendingMemberResponse[]; onClick: (memberId: string) => void }) {
  const { mutate: approveMember } = useApprovePendingMemberMutation();
  const { mutate: rejectMember } = useRejectPendingMemberMutation();
  return (
    <div className="flex-grow">
      {members.map((member) => (
        <PendingMemberCard
          key={member.pendingMemberId}
          pendingMemberId={member.pendingMemberId}
          studentId={member.studentNumber}
          name={member.name}
          grade={member.grade}
          phoneNumber={formatPhoneNumber(member.phone)}
          birthday={formatBirthday(member.birth)}
          email={member.email}
          profilePhoto={member.profilePhoto}
          onClick={() => onClick(member.pendingMemberId)}
          onApprove={() => approveMember(member.pendingMemberId)}
          onReject={() => rejectMember(member.pendingMemberId)}
        />
      ))}
    </div>
  );
}