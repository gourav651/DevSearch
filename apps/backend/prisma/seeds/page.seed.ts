import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const redisSource = await prisma.source.findUnique({
    where: { slug: "redis" },
  });

  const nodeSource = await prisma.source.findUnique({
    where: { slug: "nodejs" },
  });

  const expressSource = await prisma.source.findUnique({
    where: { slug: "express" },
  });

  const bullmqSource = await prisma.source.findUnique({
    where: { slug: "bullmq" },
  });

  if (!redisSource) {
    throw new Error("Redis source not found");
  }

  await prisma.page.createMany({
    data: [
      {
        sourceId: redisSource!.id,
        title: "Redis Pub/Sub",
        url: "https://redis.io/docs/pubsub",
        content:
          "Redis Pub/Sub allows messages between publishers and subscribers.",
        contentHash: "hash1",
      },
      {
        sourceId: redisSource!.id,
        title: "Redis Streams",
        url: "https://redis.io/docs/streams",
        content: "Redis Streams provide an append-only log data structure.",
        contentHash: "hash2",
      },
      {
        sourceId: nodeSource!.id,
        title: "Node.js Events",
        url: "https://nodejs.org/docs/events",
        content: "The Node.js EventEmitter class is used to handle events.",
        contentHash: "hash3",
      },
      {
        sourceId: expressSource!.id,
        title: "Express Middleware",
        url: "https://expressjs.com/middleware",
        content:
          "Express middleware functions have access to request and response objects.",
        contentHash: "hash4",
      },
      {
        sourceId: bullmqSource!.id,
        title: "BullMQ Queues",
        url: "https://docs.bullmq.io/guide/queues",
        content:
          "BullMQ provides robust queue processing for Node.js applications.",
        contentHash: "hash5",
      },
    ],
  });

  console.log("Pages seeded");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
