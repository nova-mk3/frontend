import { ExecutiveList } from "@/src/features/user/list/api/user";
import { useQuery } from "@tanstack/react-query";

export const useExecutibeListQuery = ({ year }: { year: string }) => {
  return useQuery({
    queryKey: ["executive", year],
    queryFn: () => ExecutiveList({ year }),
  });
};
