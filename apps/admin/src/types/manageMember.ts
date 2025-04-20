
export interface ManageMember {
    absence : boolean;
    birth: string;
    email: string;
    grade: string;
    introduction: string;
    graduation: boolean;
    name: string;
    phone: string;
    memberId: string;
    studentNumber: string;
    role: string;
    semester: string;
    profilePhoto: ProfilePhoto;
}

export interface ProfilePhoto {
    id: string;
    originalFileName: string;
    imageUrl: string;
  }

export interface ManageMemberCardModalProps {
    memberId : string;
    open : boolean;
    onClose : () => void;
}

export interface MamnageMemberCardModalContentProps {
    memberId : string;
    open : boolean;
    onClose : () => void;
}

export interface ManageMemberInfoResponse {
    memberResponse : MemberResponse;
    graduationResponse : GraduationResponse;
}

export interface MemberResponse { 
    memberId: string;
    studentNumber: string;
    name: string;
    email: string;
    grade: string;
    semester: string;
    profilePhoto: ProfilePhoto;
    phone: string;
    introduction: string;
    birth: string;
    role: string;
    graduation: boolean;
    absence : boolean;
}

export interface GraduationResponse {
    graduationId : string;
    year : string;
    contact : boolean;
    work : boolean;
    job : string;
    contactInfo : string;
    contactDescription : string;
}

export interface PutMemberInfoRequest {
    updateMemberProfileRequest : updateMemberProfileRequest;
    updateGraduationRequest : updateGraduationRequest;
}

export interface updateMemberProfileRequest {
    name: string;
    studentNumber: string;
    email: string;
    grade: string;
    semester: string;
    profilePhoto: string;
    phone: string;
    introduction: string;
    birth: string;
    graduation: boolean;
    absence : boolean;
}

export interface updateGraduationRequest {
    year : string;
    contact : boolean;
    work : boolean;
    job : string;
    contactInfo : string;
    contactDescription : string;
  }