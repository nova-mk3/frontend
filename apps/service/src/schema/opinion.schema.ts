import { z } from "zod";

export const OpinionSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "공백을 제외한 1자리 이상 입력해주세요." }),

  content: z
    .string()
    .trim()
    .min(1, { message: "공백을 제외한 1자리 이상 입력해주세요." })
});

export type OpinionInput = z.infer<typeof OpinionSchema>;