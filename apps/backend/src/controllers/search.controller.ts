import { Request, Response } from "express";
import { SearchService } from "../services/search.service";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";

export class SearchController {
  private searchService = new SearchService();

  search = asyncHandler(async (req: Request, res: Response) => {
    const query = req.query.q as string;

    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const results = await this.searchService.search(query, page, limit);

    return ApiResponse.success(res, results, "Search completed successfully");
  });
}
