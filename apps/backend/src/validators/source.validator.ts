import { z } from "zod";

export const sourceIdParamsSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid source id"),
  }),
});