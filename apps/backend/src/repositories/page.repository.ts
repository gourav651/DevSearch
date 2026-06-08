import { prisma } from "../lib/prisma";

export class PageRepository {
  async upsertPage(data: {
    sourceId: string;
    title: string;
    url: string;
    content: string;
    contentHash: string;
  }) {
    return prisma.page.upsert({
      where: {
        url: data.url,
      },
      update: {
        title: data.title,
        content: data.content,
        contentHash: data.contentHash,
      },
      create: data,
    });
  }
}