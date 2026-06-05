import { SearchResult } from "@/types/search";
import { SearchResultCard } from "./search-result-card";

interface SearchResultsProps {
  results: SearchResult[];
}

export function SearchResults({
  results,
}: SearchResultsProps) {
  if (!results.length) {
    return (
      <p className="text-center text-gray-500">
        No results found.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((result) => (
        <SearchResultCard
          key={result.id}
          result={result}
        />
      ))}
    </div>
  );
}