import { z } from "zod";
import { isStrongPassword } from "../libs/utils/isStrongPassword";

// z.enum value를 변수로 관리하고 싶은데, 리터럴만 받아야한다고 하는데 고민이 더 필요할듯
// 0학년은 졸업생입니다!
export let Zodgrade = [
  "0학년",
  "1학년",
  "2학년",
  "3학년",
  "4학년",
  "5학년",
  "6학년",
] as const;
export let Zodsemester = ["0학기", "1학기", "2학기"] as const;

export let grade = [
  "0학년",
  "1학년",
  "2학년",
  "3학년",
  "4학년",
  "5학년",
  "6학년",
];
export let semester = ["0학기", "1학기", "2학기"];

// TODO: email, studentId, phoneNumber 에 대해서 api 로 중복 검증
const studentSchema = z
  .object({
    graduation: z.boolean(),
    // 학부생
    grade: z.enum(Zodgrade).optional(),
    semester: z.enum(Zodsemester).optional(),
    absence: z.boolean().optional(),

    // 졸업생
    year: z.string().optional(),
    work: z.boolean().optional(),
    job: z.string().optional(),
    contact: z.boolean().optional(),
    contactInfo: z.string().optional(),
    contactDescription: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.graduation === false) {
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
      if (data.absence === undefined) {
        ctx.addIssue({
          path: ["absence"],
          message: "결석 여부는 필수입니다.",
          code: z.ZodIssueCode.custom,
        });
      }
    } else if (data.graduation === true) {
      // 졸업생일 경우, isWork, job, isContact, contactInfo만 필수로 요구
      if (data.work === undefined) {
        ctx.addIssue({
          path: ["work"],
          message: "근무 여부는 필수입니다.",
          code: z.ZodIssueCode.custom,
        });
      }
      if (!data.year) {
        ctx.addIssue({
          path: ["year"],
          message: "졸업년도는 필수입니다",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

const userSchema = z
  .object({
    username: z.string().nonempty({
      message: "이름을 입력해주세요",
    }),
    studentNumber: z
      .string()
      .min(10, { message: "학번은 10자리 이상이어야 합니다." })
      .regex(/^\d+$/, { message: "학번은 숫자만 입력할 수 있습니다." }),
    email: z
      .string()
      .nonempty({
        message: "이메일이 비어 있습니다.",
      })
      .email({ message: "이메일 형식에 맞지 않습니다." }),
    emailCode: z.string(),
    birth: z.date().optional(),
    profilePhoto: z
      .instanceof(File)
      .refine((file) => file instanceof File, {
        message: "프로필 이미지는 파일이어야 합니다.",
      })
      .refine((file: File) => file.type.startsWith("image/"), {
        message: "이미지 파일만 업로드할 수 있습니다.",
      })
      .optional(),
    phoneNumber: z.string().optional(),
    emailCheck: z
      .boolean()
      .refine((val) => val === true, {
        message: "인증이 필요합니다.",
      })
      .optional(),
    emailCodeCheck: z
      .boolean()
      .refine((val) => val === true, {
        message: "인증이 필요합니다.",
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.emailCheck === false) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "이메일 인증을 해야합니다.",
        path: ["emailCode"],
      });
    } else if (data.emailCodeCheck === false) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "인증을 해야합니다",
        path: ["emailCodeCheck"],
      });
    }
  });

// 비밀번호 확인
const passwordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "비밀번호는 6글자 이상이어야 합니다." })
      .refine((password) => isStrongPassword(password), {
        message: "소문자, 숫자, 특수문자를 모두 포함해야 합니다.",
      }),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "비밀번호가 일치하지 않습니다.",
        path: ["confirmPassword"], // confirmPassword 필드에 에러 추가
      });
    }
  });

export const SignupSchema = z.intersection(
  z.intersection(studentSchema, passwordSchema),
  userSchema
);
export type SignupInput = z.infer<typeof SignupSchema>;

// 현재 문제점
// 비밀번호 입력, 비밀번호 확인 이 부분을 위에 입력을 안해도 에러메세지가 뜨도록 하고싶다
// 하지만 공식문서를 읽어봐도 별 내용이 없어서 몰랐는데, 이게 object의 isValid 전부 만족해야 그때 발동함
// 개별적으로 해주기위해서 찾던중 intersection 을 사용하면 개별로 반응하는것을 테스트함
// 이게 interaction으로 묶으면 shape이 깨짐
// 라이브러리 문제인데, 일단은 intersection으로 묶어 개별 반응하도록 진행하게 해보고 싶어 진행중
