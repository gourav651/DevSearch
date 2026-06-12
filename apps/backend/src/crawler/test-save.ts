import { CrawlEngine } from "@devsearch/crawler-core";
import { SourceRepository } from "../repositories/source.repository";
import { CrawlerPersistenceService } from "./crawler-persistence.service";

async function main() {
  const crawler =
  new CrawlEngine();

  const sourceRepository =
    new SourceRepository();

  const persistence =
    new CrawlerPersistenceService();

  const source =
    await sourceRepository.findBySlug(
      "redis"
    );

  if (!source) {
    throw new Error(
      "Redis source not found"
    );
  }

  const page =
    await crawler.crawl(
      "https://redis.io/docs/latest/develop/data-types"
    );

  await persistence.savePage(
    source.id,
    page.title,
    "https://redis.io/docs/latest/develop/data-types",
    page.content
  );

  console.log(
    "Page saved successfully"
  );
}

main().catch(console.error);