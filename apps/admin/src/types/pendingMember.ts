import { ProfilePhoto } from '@/src/types/manageMember';

export interface Member {
    pendingMemberId: string;
    studentNumber: string;
    name: string;
    birth: string;
    phone: string;
    email: string;
    grade: string;
    pending: string;
    profilePhoto: ProfilePhoto;
}

export interface PendingMemberCardModalProps {
  open: boolean;
  pendingMemberId : string;
  onClose: () => void;
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

export interface PendingMembercardProps {
  name? : string,
  studentId? : string,
  phoneNumber? : string,
  birthday? : string,
  email? : string,
  grade? : string,
  role? : string,
  pendingMemberId?: string,
  onClick? : () => void,
  onApprove?: () => void,
  onReject?: () => void,
  profilePhoto: ProfilePhoto,
}