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

export interface PutMemberInfoRequest {
    updateMemberProfileRequest : updateMemberProfileRequest;
    updateMemberStatusRequest : updateGraduationRequest;
}

export interface updateMemberProfileRequest {
    name : string
    studentNumber: string,
    graduation: boolean,
    grade: number,
    semester: number,
    absence: boolean,
    birth: string,
    profilePhoto: string,
    phone: string,
    introduction: string
}

export interface updateGraduationRequest {
    year: number,
    work: boolean,
    job: string,
    contact : boolean,
    contactInfo: string,
    contactDescription: string
  }