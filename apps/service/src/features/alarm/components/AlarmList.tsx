import React from "react";
import AlarmListItem, { AlarmListItemProps } from "./AlarmListItem";

interface AlarmListProps {
  content: AlarmListItemProps[];
}

export default function AlarmList({ content }: AlarmListProps) {
  return (
    <div className="flex flex-col">
      {content.map((item: AlarmListItemProps) => (
        <AlarmListItem
          key={item.id}
          id={item.id}
          createAt={item.createAt}
          message={item.message}
          isRead={item.isRead}
        />
      ))}
    </div>
  );
}
