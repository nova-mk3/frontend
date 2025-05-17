import React from "react";
import AlarmListItem, { AlarmListItemProps } from "./AlarmListItem";

interface AlarmListProps {
  content: AlarmListItemProps[];
}

export default function AlarmList({ content }: AlarmListProps) {
  console.log(content);
  return (
    <div className="flex flex-col">
      {content.map((item: AlarmListItemProps) => (
        <AlarmListItem
          key={item.uuid}
          uuid={item.uuid}
          targetId={item.targetId}
          targetType={item.targetType}
          eventType={item.eventType}
          message={item.message}
          read={item.read}
          createdTime={item.createdTime}
        />
      ))}
    </div>
  );
}
