import { PageRepository } from "../repositories/page.repository";
import { generateContentHash } from "./content-hash";

export class CrawlerPersistenceService {
  private pageRepository =
    new PageRepository();

  async savePage(
    sourceId: string,
    title: string,
    url: string,
    content: string
  ) {
    const contentHash =
      generateContentHash(content);

    return this.pageRepository.upsertPage({
      sourceId,
      title,
      url,
      content,
      contentHash,
    });
  }
}