import { PostType } from "@/src/constant/board";

export interface Alarm {
  uuid: string;
  eventType: string;
  message: string;
  targetId: string;
  targetType: PostType;
  createdTime: string;
  read: boolean;
}

export interface UnReadAlarm {
  count: number;
}
