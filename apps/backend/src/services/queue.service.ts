import { crawlQueue } from "../queues/crawl.queue";
import { CrawlJobData } from "@devsearch/shared-types";

export class QueueService {
  async enqueueCrawl(sourceSlug: string) {
    const jobData: CrawlJobData = {
      sourceSlug,
    };

    const job = await crawlQueue.add(
      "crawl-source",
      jobData
    );

    return job.id;
  }
}