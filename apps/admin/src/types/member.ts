export interface Member {
    pendingMemberId: string;
    studentNumber: string;
    name: string;
    birth: string;
    phone: string;
    email: string;
    grade: string;
    pending: string;
    profilePhoto: {
      downloadUrl: string;
      id: string;
      originalFileName: string;
    };
}

export interface MemberCardModalProps {
    open: boolean;
    memberId? : string;
    type: "member" | "newMember";
    onClose: () => void;
    Aceept?: () => void;
    Reject?: () => void;
  }