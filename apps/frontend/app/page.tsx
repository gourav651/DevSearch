import { SearchBar } from "@/components/search/search-bar";

export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto p-8">
      <div className="mt-20 text-center">
        <h1 className="text-5xl font-bold">
          DevSearch
        </h1>

        <p className="mt-4 text-gray-500">
          Search Developer Documentation
        </p>

        <div className="mt-8">
          <SearchBar />
        </div>

        <div className="mt-8 flex justify-center gap-2">
          <span>Redis</span>
          <span>Node.js</span>
          <span>Express</span>
          <span>BullMQ</span>
        </div>
      </div>
    </main>
  );
}