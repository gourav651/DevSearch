import { prisma } from "./prisma";
import { WorkerStatusType } from "@prisma/client";

export async function sendHeartbeat() {
  await prisma.workerStatus.upsert({
    where: {
      workerName: "crawler-worker",
    },

    update: {
      status: WorkerStatusType.ONLINE,
      lastHeartbeat: new Date(),
    },

    create: {
      workerName: "crawler-worker",
      status: WorkerStatusType.ONLINE,
      lastHeartbeat: new Date(),
    },
  });

  console.log("Heartbeat");
}

export async function setBusy() {
  await prisma.workerStatus.update({
    where: {
      workerName: "crawler-worker",
    },
    data: {
      status: WorkerStatusType.BUSY,
    },
  });
}

export async function setOnline() {
  await prisma.workerStatus.update({
    where: {
      workerName: "crawler-worker",
    },
    data: {
      status: WorkerStatusType.ONLINE,
    },
  });
}