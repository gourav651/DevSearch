import { z } from "zod";

export const crawlParamsSchema = z.object({
  params: z.object({
    sourceSlug: z.string().min(1),
  }),
});