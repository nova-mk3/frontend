"use client"
import { useSearchParams } from "next/navigation";

export const useQueryParams = () => {
  const searchParams = useSearchParams();
  
  return {
    currentPage: parseInt(searchParams.get("page") || "1", 10),
    searchQuery: searchParams.get("query") || "",
    sortOption: searchParams.get("sort") || "asc",
    postId : searchParams.get("id") || "",
    postType : searchParams.get("type") || "",
  };
};