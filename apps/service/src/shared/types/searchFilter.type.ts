/**
 * 검색 필터
 */

export interface searchFilter {
  page: number;
  size: number;
  searchType: searchType;
  sortBy: sortByType;
  sortDirection: sortDirection;
  keyword: string;
}
export type searchType = "TITLE" | "CONTENT" | "ALL";

export type sortByType = "createdTime" | "modifiedTime" | "viewCount";

export type sortDirection = "asc" | "desc";

export type partialSearchFilter = Partial<searchFilter>;
