import { z } from "zod";

export const searchQuerySchema = z.object({
  query: z.object({
    q: z
      .string()
      .min(2, "Search query must be at least 2 characters"),

    page: z.coerce.number().min(1).default(1),

    limit: z.coerce.number().min(1).max(50).default(10),
  }),
});