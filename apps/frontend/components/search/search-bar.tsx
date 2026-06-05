"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  initialQuery?: string;
}

export function SearchBar({
  initialQuery = "",
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);

  const router = useRouter();

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!query.trim()) return;

    router.push(
      `/search?q=${encodeURIComponent(query)}`
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2"
    >
      <input
        type="text"
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
        placeholder="Search documentation..."
        className="flex-1 border rounded-md px-4 py-2"
      />

      <button
        type="submit"
        className="border rounded-md px-4 py-2"
      >
        Search
      </button>
    </form>
  );
}