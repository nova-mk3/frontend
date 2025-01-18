import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
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

  // 페이지 범위를 계산하는 함수
  const paginationRange = useMemo(() => {
    const totalPageNumbers = size;
    const siblings = 1; // 현재 페이지의 좌우로 표시할 페이지 수

    // 전체 페이지 수가 표시 가능한 페이지 수보다 작거나 같을 경우
    if (totalPageNumbers >= totalPage) {
      return Array.from({ length: totalPage }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblings, 1);
    const rightSiblingIndex = Math.min(currentPage + siblings, totalPage);

    const showLeftEllipsis = leftSiblingIndex > 2;
    const showRightEllipsis = rightSiblingIndex < totalPage - 1;

    const firstPageIndex = 1;
    const lastPageIndex = totalPage;

    const pages: (number | string)[] = [];

    pages.push(firstPageIndex);

    if (showLeftEllipsis) {
      pages.push("left-ellipsis");
    }

    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      if (i !== firstPageIndex && i !== lastPageIndex) {
        pages.push(i);
      }
    }

    if (showRightEllipsis) {
      pages.push("right-ellipsis");
    }

    if (lastPageIndex !== firstPageIndex) {
      pages.push(lastPageIndex);
    }

    return pages;
  }, [totalPage, size, currentPage]);

  return (
    <Pagination className={className}>
      <PaginationContent>
        {/* 이전 페이지 버튼 */}
        <PaginationItem>
          <PaginationPrevious
            href={`?page=${currentPage - 1}`}
            className={currentPage === 1 ? "pointer-events-none" : ""}
          />
        </PaginationItem>

        {/* 페이지 번호 버튼 */}
        {paginationRange.map((page, index) => {
          if (page === "left-ellipsis" || page === "right-ellipsis") {
            return (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={index}>
              <PaginationLink
                href={`?page=${page}`}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* 다음 페이지 버튼 */}
        <PaginationItem>
          <PaginationNext
            href={`?page=${currentPage + 1}`}
            className={currentPage === totalPage ? "pointer-events-none" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
