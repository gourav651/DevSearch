import { SearchRepository } from "../repositories/search.repository";
import { toSearchDto } from "../dtos/search.dto";

export class SearchService {
  private searchRepository = new SearchRepository();

  async search(query: string, page: number, limit: number) {
    const { results, total } = await this.searchRepository.search(
      query,
      page,
      limit,
    );

    return {
      results: results.map(toSearchDto),

      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
