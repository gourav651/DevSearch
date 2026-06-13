import { Worker } from "bullmq";
import { redisConnection } from "./redis";
import { setBusy, setOnline } from "./worker-status";
import { CrawlJobData } from "@devsearch/shared-types";

export const crawlWorker = new Worker(
  "crawl-queue",
  async (job) => {
    await setBusy();

    try {
      console.log(`Processing job ${job.id}`);

      const data = job.data as CrawlJobData;

      console.log(data);

      return {
        success: true,
      };
    } finally {
      await setOnline();
    }
  },
  {
    connection: redisConnection,
  },
);

crawlWorker.on("completed", (job) => {
  console.log(`Job ${job?.id} completed`);
});

crawlWorker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed`, err);
});
