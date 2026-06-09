import axios from "axios";
import { parseHtml } from "./html-parser";
import { isDocumentationUrl, isSameDomain, normalizeUrl } from "./url-utils";
import { CrawlerPersistenceService } from "./crawler-persistence.service";
import { CrawlJobService } from "../services/crawl-job.service";

export class CrawlerService {
  private persistence = new CrawlerPersistenceService();
  private crawlJobService = new CrawlJobService();

  async crawl(url: string) {
    const response = await axios.get(url);

    const parsedPage = parseHtml(response.data, url);

    parsedPage.links = parsedPage.links.filter(
      (link) =>
        isSameDomain(link, url) &&
        isDocumentationUrl(link, "https://redis.io/docs"),
    );

    return parsedPage;
  }

  async crawlSite(startUrl: string, sourceId: string, maxPages = 10) {
    const job = await this.crawlJobService.create(sourceId);
    const queue = [startUrl];

    const visited = new Set<string>();
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
          const page = await this.crawl(normalizedUrl);
          await this.persistence.savePage(
            sourceId,
            page.title,
            normalizedUrl,
            page.content,
          );

          await this.crawlJobService.updateProgress(
            job.id,
            queue.length,
            visited.size,
          );

          console.log(`Saved: ${page.title}`);

          for (const link of page.links) {
            const normalizedLink = normalizeUrl(link);

            if (!visited.has(normalizedLink)) {
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
