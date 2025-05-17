import { searchFilter } from "@/src/shared/types/searchFilter.type";

export type GetAlarmsParam = Pick<searchFilter, "page" | "size" | "sortBy">;
