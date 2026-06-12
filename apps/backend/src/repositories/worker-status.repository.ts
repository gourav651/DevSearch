import { prisma } from "../lib/prisma";
import { WorkerStatusType } from "@prisma/client";

export class WorkerStatusRepository {
  async heartbeat(workerName: string) {
    return prisma.workerStatus.upsert({
      where: {
        workerName,
      },
      update: {
        status: WorkerStatusType.ONLINE,
        lastHeartbeat: new Date(),
      },
      create: {
        workerName,
        status: WorkerStatusType.ONLINE,
        lastHeartbeat: new Date(),
      },
    });
  }
}