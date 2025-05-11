export interface MemberSignUpRequest {
  studentNumber: string;
  password: string;
  name: string;
  email: string;
  graduation: boolean;
  grade: string;
  semester: string;
  absence: boolean;
  profilePhoto?: string;
  phone?: string;
  birth?: string;
}

export interface GraduationSignUpRequest {
  year: string;
  contact: boolean;
  work: boolean;
  job: string;
  contactInfo?: string;
  contactDescription?: string;
}

export interface SignUpData {
  // memberSignUpRequest에 필요한 모든 필드
  memberSignUpRequest: MemberSignUpRequest;

  // graduation === true일 때만 필요한 필드
  graduationSignUpRequest?: GraduationSignUpRequest;
}
