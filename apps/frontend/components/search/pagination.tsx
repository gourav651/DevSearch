import Link from "next/link";

interface PaginationProps {
  query: string;
  currentPage: number;
  totalPages: number;
}

export function Pagination({
  query,
  currentPage,
  totalPages,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {currentPage > 1 && (
        <Link
          href={`/search?q=${query}&page=${currentPage - 1}`}
          className="border rounded px-4 py-2"
        >
          Previous
        </Link>
      )}

      {Array.from(
        { length: totalPages },
        (_, index) => index + 1
      ).map((page) => (
        <Link
          key={page}
          href={`/search?q=${query}&page=${page}`}
          className={`border rounded px-4 py-2 ${
            page === currentPage
              ? "font-bold"
              : ""
          }`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={`/search?q=${query}&page=${currentPage + 1}`}
          className="border rounded px-4 py-2"
        >
          Next
        </Link>
      )}
    </div>
  );
}