import { SourceRepository } from "../repositories/source.repository";
import { CrawlerService } from "../crawler/crawler.service";
import { AppError } from "../utils/AppError";

export class CrawlService {
  private sourceRepository =
    new SourceRepository();

  private crawlerService =
    new CrawlerService();

  async startCrawl(sourceSlug: string) {
    const source =
      await this.sourceRepository.findBySlug(
        sourceSlug
      );

    if (!source) {
      throw new AppError(
        "Source not found",
        404
      );
    }

    const visited =
      await this.crawlerService.crawlSite(
        source.crawlStartUrl,
        source.id,
        10
      );

    return {
      source: source.slug,
      pagesCrawled: visited.size,
    };
  }
}