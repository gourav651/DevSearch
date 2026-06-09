import { CrawlJobRepository } from "../repositories/crawl-job.repository";

export class CrawlJobService {
  private crawlJobRepository =
    new CrawlJobRepository();

  create(sourceId: string) {
    return this.crawlJobRepository.create(
      sourceId
    );
  }

  updateProgress(
    jobId: string,
    pagesDiscovered: number,
    pagesProcessed: number
  ) {
    return this.crawlJobRepository.updateProgress(
      jobId,
      pagesDiscovered,
      pagesProcessed
    );
  }

  complete(jobId: string) {
    return this.crawlJobRepository.complete(
      jobId
    );
  }

  fail(jobId: string) {
    return this.crawlJobRepository.fail(
      jobId
    );
  }
}