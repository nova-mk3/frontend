export interface Alarm {
  uuid: string;
  eventType: string;
  message: string;
  targetId: string;
  targetType: string;
  createdTime: string;
  read: boolean;
}

export interface UnReadAlarm {
  count: number;
}
