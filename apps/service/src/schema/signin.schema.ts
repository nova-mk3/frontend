import { z } from "zod";
import { isStrongPassword } from "../libs/utils/isStrongPassword";

// TODO: studentId에 대해서 등록되어 있으면 password창이 나오게 나중에 유지보수할 때 바꾸면 좋을거 같습니다.
// TODO: api 연결하면은 어떻게 할지 생각 할 것?
export const SigninSchema = z.object({
  studentId: z
    .string()
    .min(10, { message: "학번은 10자리 이상이어야 합니다." })
    .regex(/^\d+$/, { message: "학번은 숫자만 입력할 수 있습니다." }),
  password: z
    .string()
    .min(24, { message: "비밀번호가 너무 짧습니다." })
    .refine((password) => isStrongPassword(password), {
      message: "소문자, 대문자, 숫자, 특수문자를 모두 포함해야 합니다.",
    }),
});

export type SigninInput = z.infer<typeof SigninSchema>;
