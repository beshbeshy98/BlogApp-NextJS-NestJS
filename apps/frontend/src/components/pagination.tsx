"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { calculatePageNumbers } from "@/lib/helpers";

type Props = {
  totalPages: number;
  currentPage: number;
  pageNeighbors?: number;
  className?: string;
};

const Pagination = ({
  totalPages,
  currentPage,
  pageNeighbors = 2,
  className,
}: Props) => {
  const searchParams = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());

  const createPageLink = (page: number) => {
    const params = new URLSearchParams({ ...query, page: String(page) });
    return `?${params.toString()}`;
  };

  const pageNumbers = calculatePageNumbers({
    pageNeighbors,
    totalPages,
    currentPage,
  });

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {/* Previous Page Button */}
      {currentPage > 1 && (
        <Link
          href={createPageLink(currentPage - 1)}
          aria-label="Previous Page"
          className="rounded-md bg-slate-200 py-2 px-2 hover:bg-slate-300 transition"
        >
          <ChevronLeftIcon className="w-4" />
        </Link>
      )}

      {/* Page Numbers */}
      {pageNumbers.map((page, index) =>
        page === "..." ? (
          <span
            key={`dots-${index}`}
            className="px-3 py-1 rounded-md text-gray-400 cursor-not-allowed select-none"
          >
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={createPageLink(Number(page))}
            aria-current={currentPage === page ? "page" : undefined}
            className={cn(
              "px-3 py-1 rounded-md transition",
              currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-slate-200 hover:bg-slate-300 hover:text-sky-600"
            )}
          >
            {page}
          </Link>
        )
      )}

      {/* Next Page Button */}
      {currentPage < totalPages && (
        <Link
          href={createPageLink(currentPage + 1)}
          aria-label="Next Page"
          className="rounded-md bg-slate-200 py-2 px-2 hover:bg-slate-300 transition"
        >
          <ChevronRightIcon className="w-4" />
        </Link>
      )}
    </div>
  );
};

export default Pagination;
