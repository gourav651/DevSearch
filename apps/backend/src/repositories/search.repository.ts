import { prisma } from "../lib/prisma";

export class SearchRepository {
  async search(
    query: string,
    page: number,
    limit: number
  ) {
    const skip = (page - 1) * limit;

    const whereClause = {
      OR: [
        {
          title: {
            contains: query,
            mode: "insensitive" as const,
          },
        },
        {
          content: {
            contains: query,
            mode: "insensitive" as const,
          },
        },
      ],
    };

    const [results, total] = await Promise.all([
      prisma.page.findMany({
        where: whereClause,
        include: {
          source: true,
        },
        skip,
        take: limit,
      }),

      prisma.page.count({
        where: whereClause,
      }),
    ]);

    return {
      results,
      total,
    };
  }
}