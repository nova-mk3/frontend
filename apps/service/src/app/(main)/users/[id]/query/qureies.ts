import { getMember } from "@/src/api/user/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { UserProfile } from "../edit/EditForm";

export const userKeys = {
  all: ["mypage"] as const,
  user: (memberId: string) => [...userKeys.all, "user", memberId] as const,
};

export const useGetUserData = ({ memberId }: { memberId: string }) => {
  return useSuspenseQuery<UserProfile>({
    queryKey: userKeys.user(memberId),
    queryFn: () => getMember({ memberId }), // ✅ 데이터 타입이 UserProfile로 확정됨
  });
};
