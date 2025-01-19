"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@nova/ui/components/ui/pagination";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

interface PaginationProps {
  totalPage: number;
  size: number;
  className?: string;
}

export function PageNation({ totalPage, size, className }: PaginationProps) {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const paginationRange = useMemo(() => {
    const totalPageNumbers = size;

    // Adjust startPage based on whether currentPage exceeds the size boundary
    const currentGroup = Math.floor((currentPage - 1) / size);
    const startPage = currentGroup * size + 1;
    const endPage = Math.min(totalPage, startPage + totalPageNumbers - 1);

    const pages: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }, [totalPage, size, currentPage]);

  return (
    <Pagination className={className}>
      <PaginationContent>
        {/* Previous Page Button */}
        <PaginationItem>
          <PaginationPrevious
            href={`?page=${Math.max(1, currentPage - 1)}`}
            className={currentPage === 1 ? "pointer-events-none" : ""}
          />
        </PaginationItem>

        {/* Page Number Buttons */}
        {paginationRange.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={`?page=${page}`}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Next Page Button */}
        <PaginationItem>
          <PaginationNext
            href={`?page=${Math.min(totalPage, currentPage + 1)}`}
            className={currentPage === totalPage ? "pointer-events-none" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
