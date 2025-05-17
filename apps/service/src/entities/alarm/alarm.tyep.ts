export interface Alarm {
  id: string;
  isRead: boolean;
  message: string;
  createAt: string;
}

export interface UnReadAlarm {
  count: number;
}
