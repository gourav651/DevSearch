import { prisma } from "../lib/prisma";
import { CrawlJobStatus } from "@prisma/client";

export class CrawlJobRepository {
  async create(sourceId: string) {
    return prisma.crawlJob.create({
      data: {
        sourceId,
        status: CrawlJobStatus.RUNNING,
        startedAt: new Date(),
      },
    });
  }

  async updateProgress(
    jobId: string,
    pagesDiscovered: number,
    pagesProcessed: number
  ) {
    return prisma.crawlJob.update({
      where: { id: jobId },
      data: {
        pagesDiscovered,
        pagesProcessed,
      },
    });
  }

  async complete(jobId: string) {
    return prisma.crawlJob.update({
      where: { id: jobId },
      data: {
        status: CrawlJobStatus.COMPLETED,
        finishedAt: new Date(),
      },
    });
  }

  async fail(jobId: string) {
    return prisma.crawlJob.update({
      where: { id: jobId },
      data: {
        status: CrawlJobStatus.FAILED,
        finishedAt: new Date(),
      },
    });
  }
}