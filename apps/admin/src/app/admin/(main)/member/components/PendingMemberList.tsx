import { useApprovePendingMemberMutation, useRejectPendingMemberMutation } from "@/src/query/pendingMembersQueries";
import { PendingMemberResponse } from "@/src/types/pendingMember";
import PendingMemberCard from "@/src/app/admin/(main)/member/components/PendingMemberCard";
import { formatBirthDay, formatPhoneNumber } from '@/src/utils/formatter';

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
          grade={member.absence ? "휴학생" : member.graduation ? "졸업생" : member.grade}
          phoneNumber={formatPhoneNumber(member.phone)}
          birthday={formatBirthDay(member.birth)}
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