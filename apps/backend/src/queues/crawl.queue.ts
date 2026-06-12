import { Queue } from "bullmq";
import { redisConnection } from "./redis";

export const crawlQueue = new Queue(
  "crawl-queue",
  {
    connection: redisConnection,
  }
);