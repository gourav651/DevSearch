import { crawlQueue } from "../queues/crawl.queue";

export class QueueService {
  async enqueueCrawl(sourceSlug: string) {
    const job = await crawlQueue.add(
      "crawl-source",
      {
        sourceSlug,
      }
    );

    return job.id;
  }
}