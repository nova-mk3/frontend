import { ProfilePhoto } from '@/src/types/manageMember';

export interface PostExecutiveMemberRequest {
    year: number;
    role: enumRoleType;
    name: string;
    memberId: string;
  }

export interface ExecutiveModalProps {
    year: number;
    open: boolean;
    onClose: () => void;
}

export interface ExecutiveMember{
    executiveHistoryId: string;
    year: number;
    role: enumRoleType;
    name: string;
    memberId: string;
    phone: string;
    profilePhotoResponse: ProfilePhoto;
}

export enum enumRoleType{
    EXECUTIVE = "EXECUTIVE", 
    CHAIRMAN = "CHAIRMAN", 
    VICE_CHAIRMAN = "VICE_CHAIRMAN", 
    GENERAL = "GENERAL", 
    ADMINISTRATOR = "ADMINISTRATOR",
}

export interface ExecutiveMembercardProps {
    selectedYear?: number,
    name? : string,
    studentId? : string,
    phone? : string,
    birthday? : string,
    role? : enumRoleType,
    executiveHistoryId? : string,
    profilePhotoResponse: ProfilePhoto,
}