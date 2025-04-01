import { z } from "zod";
import { isStrongPassword } from "../libs/utils/isStrongPassword";

let serverpassword = "";

export const PwdSchema = z
  .object({
    // currentPassword: z.string().nonempty({message : "꼭 입력해야 합니다"}).refine( (val) => val ===serverpassword,{message : "비밀번호가 일치하지 않습니다"} ),

    newPassword: z
      .string()
      .min(6, { message: "비밀번호는 6글자 이상이어야 합니다." })
      .refine((password) => isStrongPassword(password), {
        message: "소문자, 숫자, 특수문자를 모두 포함해야 합니다.",
      }),

    confirmNewPassword: z
      .string()
      .min(6, { message: "비밀번호는 6글자 이상이어야 합니다." })
      .refine((password) => isStrongPassword(password), {
        message: "소문자, 숫자, 특수문자를 모두 포함해야 합니다.",
      }),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmNewPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "비밀번호가 일치하지 않습니다.",
        path: ["confirmPassword"],
      });
    }
  });

export type PwdInput = z.infer<typeof PwdSchema>;
