import { getMember } from "@/src/api/user/client";
import { useQuery } from "@tanstack/react-query";
import { postKeys } from "../../../board/query/postqueries";
import { mypagePostGet, mypageSuggestionGet } from "@/src/api/user/post";

export const userKeys = {
  all: ["mypage"] as const,
  profile: "memberProfile",
  user: (memberId: string) => [...userKeys.all, "user", memberId] as const,
  list: () => [...userKeys.all, "list"],
  post: (page: number, size: number) => [
    ...userKeys.list(),
    "post",
    { page, size },
  ],
  suggestion: (page: number, size: number) => [
    ...userKeys.list(),
    "suggestion",
    { page, size },
  ],
};

export const useGetUserData = ({ memberId }: { memberId: string }) => {
  return useQuery({
    queryKey: userKeys.user(memberId),
    queryFn: () => getMember({ memberId }), // ✅ 데이터 타입이 UserProfile로 확정됨
  });
};

export const useMypagePostQuery = ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  return useQuery({
    queryKey: userKeys.post(page, size),
    queryFn: () => mypagePostGet({ page, size }), // ✅ 데이터 타입이 UserProfile로 확정됨
  });
};

export const useMypageSuggestionQuery = ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  return useQuery({
    queryKey: userKeys.suggestion(page, size),
    queryFn: () => mypageSuggestionGet({ page, size }), // ✅ 데이터 타입이 UserProfile로 확정됨
  });
};
