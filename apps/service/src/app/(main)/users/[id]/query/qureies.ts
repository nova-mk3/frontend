import { getMember } from "@/src/api/user/client";
import { useQuery } from "@tanstack/react-query";

export const userKeys = {
  all: ["mypage"] as const,
  profile: "memberProfile",
  user: (memberId: string) => [...userKeys.all, "user", memberId] as const,
};

export const useGetUserData = ({ memberId }: { memberId: string }) => {
  return useQuery({
    queryKey: userKeys.user(memberId),
    queryFn: () => getMember({ memberId }), // ✅ 데이터 타입이 UserProfile로 확정됨
  });
};
