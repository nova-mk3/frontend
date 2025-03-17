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

export interface PendingMemberCardModalProps {
  open: boolean;
  pendingMemberId : string;
  onClose: () => void;
  Aceept?: () => void;
  Reject?: () => void;
}

export interface PendingGraduationResponse {
  contact: boolean;
  contactDescription: string;
  contactInfo: string;
  id: string;
  job: string;
  work: string;
  year: number;
}

export interface ProfilePhoto {
  id: string;
  originalFileName: string;
  downloadUrl: string;
}

export interface PendingMemberResponse {
  absence: boolean;
  birth: string;
  email: string;
  grade: string;
  graduation: boolean;
  introduction: string;
  name: string;
  pendingMemberId: string;
  phone: string;
  profilePhoto: ProfilePhoto;
  rejected: boolean;
  semester: string;
  studentNumber: string;
}

export interface SpecificPendingMemberApiResponse {
  pendingGraduationResponse: PendingGraduationResponse;
  pendingMemberResponse: PendingMemberResponse;
}

export interface PendingMembersApiResponse {
  pendingMemberResponseList: PendingMemberResponse[];
  totalPendingMemberCount: number;
}