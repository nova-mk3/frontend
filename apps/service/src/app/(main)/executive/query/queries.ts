import { ExecutiveList } from "@/src/api/people";
import { useQuery } from "@tanstack/react-query";

export const useExecutibeListQuery = ({ year }: { year: string }) => {
  return useQuery({
    queryKey: ["executive", year],
    queryFn: () => ExecutiveList({ year }),
  });
};
