const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

export async function searchDocs(
  query: string,
  page = 1,
  limit = 10
) {
  const response = await fetch(
    `${API_URL}/api/v1/search?q=${query}&page=${page}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch search results");
  }

  return response.json();
}