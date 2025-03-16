import { z } from "zod";

export const SigninSchema = z.object({
  studentNumber: z
    .string()
    .min(10, { message: "학번은 10자리 이상이어야 합니다." })
    .regex(/^\d+$/, { message: "학번은 숫자만 입력할 수 있습니다." }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 8글자 이상이어야 합니다." })
});

export type SigninInput = z.infer<typeof SigninSchema>;
