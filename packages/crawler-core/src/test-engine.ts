import { CrawlEngine } from "./crawl-engine";

async function main() {
  const engine = new CrawlEngine();

  const pages = await engine.crawlSite(
    "https://redis.io/docs",
    3
  );

  console.log(
    `Pages Crawled: ${pages.length}`
  );

  console.log(
    pages.map((p) => p.title)
  );
}

main().catch(console.error);