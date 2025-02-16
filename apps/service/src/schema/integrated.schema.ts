import { z } from "zod";

export const IntegratedSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "공백을 제외한 1자리 이상 입력해주세요." }),

  content: z
    .string()
    .trim()
    .min(1, { message: "공백을 제외한 1자리 이상 입력해주세요." }),

   category: z
    .string().nonempty(),
});

export type IntegratedInput = z.infer<typeof IntegratedSchema>;