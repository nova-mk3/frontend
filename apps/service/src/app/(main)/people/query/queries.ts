import { UserListGet } from "@/src/features/user/list/api/user";
import { useQuery } from "@tanstack/react-query";

export const useUserListQuery = ({ grade }: { grade: string }) => {
  return useQuery({
    queryKey: ["userlist", grade],
    queryFn: () => UserListGet({ grade }),
  });
};
