import { login } from "@/src/api/auth";
import { useQueryParams } from "@/src/app/(main)/components/useQueryParams";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
export function useLoginMutation() {
  const { redirectUrl } = useQueryParams();

  const router = useRouter();
  return useMutation({
    mutationFn: ({
      studentNumber,
      password,
    }: {
      studentNumber: string;
      password: string;
    }) => login({ studentNumber, password }),
    onSuccess: (data: any) => {
      // 로그인 성공
      alert("로그인 성공");

      router.push(redirectUrl);
    },
    onError: (error) => {
      alert(error.message);
    },
  });
}
