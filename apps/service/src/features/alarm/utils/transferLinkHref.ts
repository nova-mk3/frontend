import { POST_TYPE, PostType } from "@/src/constant/board";
import { Alarm } from "@/src/entities/alarm/alarm.type";

export function transferLinkHref({
  targetType,
  targetId,
}: Pick<Alarm, "targetType" | "targetId">) {
  if (
    targetType === POST_TYPE.EXAM_ARCHIVE ||
    targetType === POST_TYPE.PICTURES || 
    targetType === POST_TYPE.SUGGESTION
  ) {
    return `/${targetType.toLowerCase()}/${targetId}`;
  } else {
    return `/board/${targetType.toLowerCase()}/${targetId}`;
  }
}
