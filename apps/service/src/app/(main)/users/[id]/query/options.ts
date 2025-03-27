import { queryOptions } from "@tanstack/react-query";
import { userKeys } from "./qureies";
import { getSimpleProfie } from "@/src/api/user/client";
export const SimpleProfileQueryOptions = () => {
  return queryOptions({
    queryKey: [userKeys.profile],
    queryFn: () => getSimpleProfie(),
    staleTime: 0,
  });
};
