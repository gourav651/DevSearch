import { CrawlerService } from "./crawler.service";

async function main() {
  const crawler = new CrawlerService();

  const visited = await crawler.crawlSite(
    "https://redis.io/docs",
    10
  );

  console.log("\nTOTAL PAGES CRAWLED:");
  console.log(visited.size);

  console.log("\nCRAWLED URLS:");

  for (const url of visited) {
    console.log(url);
  }
}

main().catch(console.error);