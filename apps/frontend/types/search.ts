export interface SearchResult {
  id: string;
  title: string;
  url: string;
  snippet: string;

  source: {
    name: string;
    slug: string;
  };
}

export interface SearchResponse {
  results: SearchResult[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}