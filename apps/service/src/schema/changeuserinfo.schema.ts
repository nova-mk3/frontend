import { z } from "zod";
import { Zodgrade, Zodsemester } from "./signup.schema";

const studentSchema = z
  .object({
    graduation: z.boolean(),
    // 학부생
    grade: z.enum(Zodgrade).optional(),
    semester: z.enum(Zodsemester).optional(),
    absence: z.boolean().optional(),
    introduction: z.string().optional(),
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
      if (data.grade !== "초과학기") {
        ctx.addIssue({
          path: ["semester"],
          message: "학기는 필수입니다.",
          code: z.ZodIssueCode.custom,
        });
      }
      if (data.absence === undefined) {
        ctx.addIssue({
          path: ["absence"],
          message: "휴학 여부는 필수입니다.",
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

const userSchema = z.object({
  username: z.string().nonempty({
    message: "이름을 입력해주세요",
  }),
  studentNumber: z
    .string()
    .min(10, { message: "학번은 10자리 이상이어야 합니다." })
    .regex(/^\d+$/, { message: "학번은 숫자만 입력할 수 있습니다." }),

  birth: z.date().optional(),
  phoneNumber: z.string().optional(),
});

export const ChangeUserInfoSchema = z.intersection(studentSchema, userSchema);
export type ChangeUserInfoInput = z.infer<typeof ChangeUserInfoSchema>;
