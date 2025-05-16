import { login } from "@/src/features/auth/api/auth";
import { useMutation } from "@tanstack/react-query";

export function useLoginMutation() {
  return useMutation({
    mutationFn: ({
      studentNumber,
      password,
    }: {
      studentNumber: string;
      password: string;
    }) => login({ studentNumber, password }),
  });
}
