import { SearchResult } from "@/types/search";

interface SearchResultCardProps {
  result: SearchResult;
}

export function SearchResultCard({
  result,
}: SearchResultCardProps) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition">
      <div className="mb-2">
        <span className="text-sm text-gray-500">
          {result.source.name}
        </span>
      </div>

      <a
        href={result.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xl font-semibold hover:underline"
      >
        {result.title}
      </a>

      <p className="mt-2 text-gray-600">
        {result.snippet}
      </p>

      <p className="mt-2 text-sm text-green-700">
        {result.url}
      </p>
    </div>
  );
}