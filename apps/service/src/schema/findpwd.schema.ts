import { z } from "zod";

export const FindPwdSchema = z.object({
  email: z
    .string()
    .nonempty({
      message: "이메일이 비어 있습니다.",
    })
    .email({ message: "이메일 형식에 맞지 않습니다." }),
  name: z.string().nonempty({
    message: "이름이 비어 있습니다.",
  }),
});

export type FindPwdInput = z.infer<typeof FindPwdSchema>;
