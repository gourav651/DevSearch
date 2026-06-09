import { Request, Response } from "express";
import { CrawlService } from "../services/crawl.service";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";

export class CrawlController {
  private crawlService = new CrawlService();

  startCrawl = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.crawlService.startCrawl(
      req.params.sourceSlug as string,
    );

    return ApiResponse.success(res, result, "Crawl completed successfully");
  });
}
