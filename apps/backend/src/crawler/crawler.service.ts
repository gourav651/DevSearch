import axios from "axios";
import { parseHtml } from "@devsearch/crawler-core";
import {
  isDocumentationUrl,
  isSameDomain,
  normalizeUrl,
} from "@devsearch/crawler-core";
import { CrawlerPersistenceService } from "./crawler-persistence.service";
import { CrawlJobService } from "../services/crawl-job.service";
import { CrawlEngine } from "@devsearch/crawler-core";

export class CrawlerService {
  private persistence = new CrawlerPersistenceService();
  private crawlJobService = new CrawlJobService();
  private crawlEngine = new CrawlEngine();

  async crawlSite(startUrl: string, sourceId: string, maxPages = 10) {
    const job = await this.crawlJobService.create(sourceId);
    const queue = [startUrl];

    const visited = new Set<string>();
    const discovered = new Set<string>();

    discovered.add(startUrl);
    try {
      while (queue.length > 0 && visited.size < maxPages) {
        const currentUrl = queue.shift();

        if (!currentUrl) continue;

        const normalizedUrl = normalizeUrl(currentUrl);

        if (visited.has(normalizedUrl)) {
          continue;
        }

        console.log(`Crawling: ${normalizedUrl}`);

        visited.add(normalizedUrl);

        try {
          const page = await this.crawlEngine.crawl(normalizedUrl);
          await this.persistence.savePage(
            sourceId,
            page.title,
            normalizedUrl,
            page.content,
          );

          await this.crawlJobService.updateProgress(
            job.id,
            discovered.size,
            visited.size,
          );

          console.log(`Saved: ${page.title}`);

          for (const link of page.links) {
            const normalizedLink = normalizeUrl(link);

            if (!discovered.has(normalizedLink)) {
              discovered.add(normalizedLink);
              queue.push(normalizedLink);
            }
          }
        } catch (error) {
          console.error(`Failed: ${currentUrl}`);
        }
      }

      await this.crawlJobService.complete(job.id);
      return visited;
    } catch (error) {
      await this.crawlJobService.fail(job.id);
      throw error;
    }
  }
}
