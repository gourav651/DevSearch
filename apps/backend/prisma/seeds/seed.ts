import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const sources = [
    {
      name: "Redis",
      slug: "redis",
      baseUrl: "https://redis.io",
      crawlStartUrl: "https://redis.io/docs",
      description: "Redis Official Documentation",
    },
    {
      name: "Node.js",
      slug: "nodejs",
      baseUrl: "https://nodejs.org",
      crawlStartUrl: "https://nodejs.org/docs/latest/api",
      description: "Node.js Official Documentation",
    },
    {
      name: "Express",
      slug: "express",
      baseUrl: "https://expressjs.com",
      crawlStartUrl: "https://expressjs.com",
      description: "Express.js Documentation",
    },
    {
      name: "Next.js",
      slug: "nextjs",
      baseUrl: "https://nextjs.org",
      crawlStartUrl: "https://nextjs.org/docs",
      description: "Next.js Documentation",
    },
    {
      name: "BullMQ",
      slug: "bullmq",
      baseUrl: "https://docs.bullmq.io",
      crawlStartUrl: "https://docs.bullmq.io",
      description: "BullMQ Documentation",
    },
    {
      name: "PostgreSQL",
      slug: "postgresql",
      baseUrl: "https://www.postgresql.org/docs",
      crawlStartUrl: "https://www.postgresql.org/docs",
      description: "PostgreSQL Documentation",
    },
    {
      name: "Docker",
      slug: "docker",
      baseUrl: "https://docs.docker.com",
      crawlStartUrl: "https://docs.docker.com",
      description: "Docker Documentation",
    },
  ];

  for (const source of sources) {
    await prisma.source.upsert({
      where: {
        slug: source.slug,
      },
      update: {},
      create: source,
    });
  }

  console.log("✅ Sources seeded successfully");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
