import { crawlQueue } from "./crawl.queue";

async function main() {
  await crawlQueue.add(
    "crawl-source",
    {
      sourceSlug: "redis",
    }
  );

  console.log("Job added successfully");
}

main().catch(console.error);