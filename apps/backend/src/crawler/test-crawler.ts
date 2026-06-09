import { CrawlerService } from "./crawler.service";
import { SourceRepository } from "../repositories/source.repository";

async function main() {
  const crawler = new CrawlerService();

  const sourceRepository =
    new SourceRepository();

  const source =
    await sourceRepository.findBySlug(
      "redis"
    );

  if (!source) {
    throw new Error(
      "Redis source not found"
    );
  }

  const visited =
    await crawler.crawlSite(
      source.crawlStartUrl,
      source.id,
      10
    );

  console.log(
    `\nTotal Pages Crawled: ${visited.size}`
  );
}

main().catch(console.error);