import { z } from "zod";
import { isStrongPassword } from "../libs/utils/isStrongPassword";

// TODO: email, studentId, phoneNumber 에 대해서 api 로 중복 검증
export const SignupSchema = z
  .object({
    username: z.string(),
    email: z.string().email({ message: "이메일 형식에 맞지 않습니다." }),
    studentId: z
      .string()
      .min(10, { message: "학번은 10자리 이상이어야 합니다." })
      .regex(/^\d+$/, { message: "학번은 숫자만 입력할 수 있습니다." }),
    grade: z.enum(["1학년", "2학년", "3학년", "4학년", "5학년"]),
    semester: z.enum(["1학기", "2학기"]),
    birth: z.date(),
    profileImage: z
      .instanceof(File)
      .refine((file) => file instanceof File, {
        message: "프로필 이미지는 파일이어야 합니다.",
      })
      .refine((file: File) => file.type.startsWith("image/"), {
        message: "이미지 파일만 업로드할 수 있습니다.",
      })
      .optional(),
    gender: z.enum(["남성", "여성"]),
    phoneNumber: z.string(),
    password: z
      .string()
      .min(24, { message: "비밀번호는 24글자 이상이어야 합니다." })
      .refine((password) => isStrongPassword(password), {
        message: "소문자, 대문자, 숫자, 특수문자를 모두 포함해야 합니다.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupInput = z.infer<typeof SignupSchema>;
