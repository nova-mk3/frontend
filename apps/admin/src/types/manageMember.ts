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