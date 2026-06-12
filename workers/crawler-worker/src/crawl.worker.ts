import { Worker } from "bullmq";
import { redisConnection } from "./redis";
import { setBusy, setOnline } from "./worker-status";

export const crawlWorker = new Worker(
  "crawl-queue",
  async (job) => {
    await setBusy();

    try {
      console.log(`Processing job ${job.id}`);

      console.log(job.data);

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
