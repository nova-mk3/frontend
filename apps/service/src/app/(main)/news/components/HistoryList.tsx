import React from "react";
export interface History {
  time: string;
  text: string;
}

interface Props {
  introduction?: string;
  year: string;
  history: History[];
}
export default function HistoryList({ introduction, year, history }: Props) {
  return (
    <div className="flex flex-row mt-10 mobile:flex-col mobile:gap-5 mobile:w-[90%] mobile:mx-auto">
      <div className="flex flex-col gap-1 w-[300px]">
        <p className="h-s text-primary !font-bold">{year}</p>
        <p className="text-text03">{introduction}</p>
      </div>
      <ul className="border-l-[4px] border-line01 pl-20 flex flex-col gap-3 ">
        {history.map((item, index) => (
          <Item key={index} time={item.time} text={item.text} />
        ))}
      </ul>
    </div>
  );
}

const Item = ({ time, text }: History) => {
  return (
    <li className="flex flex-row gap-5 items-center">
      <p>{time}</p> <p className="text-text02">{text}</p>
    </li>
  );
};
