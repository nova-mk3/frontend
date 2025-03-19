import { login } from "@/src/api/auth";
import { useQueryParams } from "@/src/app/(main)/components/useQueryParams";
import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
export function useLoginMutation() {
  const pathname = usePathname();
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

      if (redirectUrl) {
        router.push(decodeURI(redirectUrl));
      } else {
        if (pathname === "/signup") {
          router.push("/");
        } else {
          router.back();
        }
      }
    },
    onError: (error) => {
      alert(error.message);
    },
  });
}
