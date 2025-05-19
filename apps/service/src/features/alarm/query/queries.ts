import { useQuery } from "@tanstack/react-query";
import { GetUnreadAlarmCount } from "../api/alarm";

export const useUnreadAlarmCountQuery = ({
  enabled = true,
}: {
  enabled?: boolean;
}) =>
  useQuery({
    queryKey: ["unreadAlarmCount"],
    queryFn: GetUnreadAlarmCount,
    enabled: enabled,
    throwOnError: false,
    staleTime: 0,
  });
