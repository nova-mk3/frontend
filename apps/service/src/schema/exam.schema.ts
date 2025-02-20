import { z } from "zod";

export const ExamSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "공백을 제외한 1자리 이상 입력해주세요." }),

  content: z
    .string()
    .trim()
    .min(1, { message: "공백을 제외한 1자리 이상 입력해주세요." }),

     semester: z
    .string().nonempty({ message: "학기를 선택해주세요" }),

    year: z
    .string().nonempty({ message: "년도를 선택해주세요" }),

    professorName: z
    .string() 
    .trim()
    .min(1, { message: "교수명을 입력해주세요" }),

    subject: z
    .string() 
    .trim()
    .min(1, { message: "과목을 입력해주세요" }),
    
});

export type ExamInput = z.infer<typeof ExamSchema>;