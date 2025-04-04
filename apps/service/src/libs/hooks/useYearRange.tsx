import { useMemo } from "react";

export default function useYearRange(startYear: number, endYear: number) {
  const years = useMemo(() => {
    const yearArray = [];
    for (let y = endYear; y >= startYear; y--) {
      yearArray.push(y);
    }
    return yearArray;
  }, [startYear, endYear]);

  return years;
}
