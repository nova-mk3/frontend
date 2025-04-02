import { z } from "zod";

export const EmailSchema = z.object({
  email: z
    .string()
    .nonempty({
      message: "이메일이 비어 있습니다.",
    })
    .email({ message: "이메일 형식에 맞지 않습니다." }),
  emailCheck: z
    .boolean()
    .refine((val) => val === true, {
      message: "인증이 필요합니다.",
    })
    .optional(),

  emailCode: z.string().nonempty({ message: "인증코드를 입력해주세요" }),

  emailCodeCheck: z
    .boolean()
    .refine((val) => val === true, {
      message: "인증이 필요합니다.",
    })
    .optional(),
});

export type EmailInput = z.infer<typeof EmailSchema>;
