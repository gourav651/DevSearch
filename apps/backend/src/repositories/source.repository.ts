import { prisma } from "../lib/prisma";

export class SourceRepository {
  async findAll() {
    return prisma.source.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        name: "asc",
      },
    });
  }

  async findById(id: string) {
    return prisma.source.findUnique({
      where: {
        id,
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.source.findUnique({
      where: {
        slug,
      },
    });
  }
}
