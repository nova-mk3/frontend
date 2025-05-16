import { queryOptions } from "@tanstack/react-query";
import { userKeys } from "./qureies";
import { getSimpleProfie } from "@/src/features/user/list/api/user";

export const SimpleProfileQueryOptions = () => {
  return queryOptions({
    queryKey: [userKeys.profile],
    queryFn: getSimpleProfie,
    staleTime: Infinity,
    throwOnError: false,
  });
};
