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

export enum enumRoleType{
    EXECUTIVE = "EXECUTIVE", 
    CHAIRMAN = "CHAIRMAN", 
    VICE_CHAIRMAN = "VICE_CHAIRMAN", 
    GENERAL = "GENERAL", 
    ADMINISTRATOR = "ADMINISTRATOR",
}