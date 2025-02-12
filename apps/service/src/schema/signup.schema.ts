import { z } from "zod";
import { isStrongPassword } from "../libs/utils/isStrongPassword";


// z.enum value를 변수로 관리하고 싶은데, 리터럴만 받아야한다고 하는데 고민이 더 필요할듯
export let Zodgrade = ["1학년", "2학년", "3학년", "4학년", "5학년"] as const;
export let Zodsemester = ["1학기", "2학기"] as const;

export let grade = ["1학년", "2학년", "3학년", "4학년", "5학년"]
export let semester = ["1학기", "2학기"];


// TODO: email, studentId, phoneNumber 에 대해서 api 로 중복 검증
const studentSchema = z
  .object({

    studentType : z.enum(["재학생", "졸업생"]),
    // 학부생
    grade: z.enum(Zodgrade).optional(),
    semester: z.enum(Zodsemester).optional(),
    isAbsence : z.string().optional(),

    
    // 졸업생 
    isWork :  z.string().optional(),
    job : z.string().optional(),
    isContact : z.string().optional(),
    contactInfo : z.string().optional(),
    contactInfoDescription : z.string().optional(),
  }).superRefine((data, ctx) => {
    if (data.studentType === "재학생") {
      // 재학생일 경우, grade, semester, isAbsence만 필수로 요구
      if (!data.grade) {
        ctx.addIssue({
          path: ["grade"],
          message: "학년은 필수입니다.",
          code: z.ZodIssueCode.custom,
        });
      }
      if (!data.semester) {
        ctx.addIssue({
          path: ["semester"],
          message: "학기는 필수입니다.",
          code: z.ZodIssueCode.custom,
        });
      }
      if (!data.isAbsence) {
        ctx.addIssue({
          path: ["isAbsence"],
          message: "결석 여부는 필수입니다.",
          code: z.ZodIssueCode.custom,
        });
      }
    } else if (data.studentType === "졸업생") {
      // 졸업생일 경우, isWork, job, isContact, contactInfo만 필수로 요구
      if (!data.isWork) {
        ctx.addIssue({
          path: ["isWork"],
          message: "근무 여부는 필수입니다.",
          code: z.ZodIssueCode.custom,
        });
      }

    }
  });

const userSchema = z.object({
  username: z.string(),
    studentId: z
      .string()
      .min(10, { message: "학번은 10자리 이상이어야 합니다." })
      .regex(/^\d+$/, { message: "학번은 숫자만 입력할 수 있습니다." }),
      email: z.string().nonempty({
        message: "이메일이 비어 있습니다."
      }).email({ message: "이메일 형식에 맞지 않습니다." }),
      emailCode : z.string(),
      confirmEmailCode: z.string().optional(),
      birth: z.date().optional(),
      profileImage: z
        .instanceof(File)
        .refine((file) => file instanceof File, {
          message: "프로필 이미지는 파일이어야 합니다.",
        })
        .refine((file: File) => file.type.startsWith("image/"), {
          message: "이미지 파일만 업로드할 수 있습니다.",
        })
        .optional(),
      phoneNumber: z.string().optional(),
      emailCheck: z.boolean().refine((val) => val === true,{
        message: "인증한 이메일과 다른지 확인하세요!"
      }).optional(),
}).superRefine((data, ctx) => {

  if (data.emailCheck === false) {
    console.log("ㅎ")
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "이메일 인증을 해야합니다.",
      path: ["emailCode"],
    });
  }
  else if (data.emailCode !== data.confirmEmailCode) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "인증코드가 일치하지 않습니다",
      path: ["emailCode"],
    });
  }
}); 



  // 비밀번호 확인
const passwordSchema = z.object({
  password: z
      .string()
      .min(8, { message: "비밀번호는 8글자 이상이어야 합니다." })
      .refine((password) => isStrongPassword(password), {
        message: "소문자, 대문자, 숫자, 특수문자를 모두 포함해야 합니다.",
      }),
    confirmPassword: z.string().nonempty()
}).superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "비밀번호가 일치하지 않습니다.",
      path: ["confirmPassword"], // confirmPassword 필드에 에러 추가
    });
  }
}); 




export const SignupSchema = z.intersection(z.intersection(studentSchema,passwordSchema),userSchema);
export type SignupInput = z.infer<typeof SignupSchema>;


// 현재 문제점
// 비밀번호 입력, 비밀번호 확인 이 부분을 위에 입력을 안해도 에러메세지가 뜨도록 하고싶다
// 하지만 공식문서를 읽어봐도 별 내용이 없어서 몰랐는데, 이게 object의 isValid 전부 만족해야 그때 발동함
// 개별적으로 해주기위해서 찾던중 intersection 을 사용하면 개별로 반응하는것을 테스트함
// 이게 interaction으로 묶으면 shape이 깨짐
// 라이브러리 문제인데, 일단은 intersection으로 묶어 개별 반응하도록 진행하게 해보고 싶어 진행중


