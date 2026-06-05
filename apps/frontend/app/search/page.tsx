import { searchDocs } from "@/lib/api";
import { SearchBar } from "@/components/search/search-bar";
import { SearchResults } from "@/components/search/search-results";
import { Pagination } from "@/components/search/pagination";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q, page } = await searchParams;

  const currentPage = Number(page) || 1;

  const query = q ?? "";

  let results = null;

  if (query) {
    const response = await searchDocs(query, currentPage);

    results = response.data;
  }

  return (
    <main className="max-w-5xl mx-auto p-8">
      <SearchBar initialQuery={query} />

      <div className="mt-8">
        {results ? (
          <>
            <p className="mb-6">{results.pagination.total} results found</p>

            <SearchResults results={results.results} />
            <Pagination
              query={query}
              currentPage={results.pagination.page}
              totalPages={results.pagination.totalPages}
            />
          </>
        ) : (
          <p>Search for documentation...</p>
        )}
      </div>
    </main>
  );
}
