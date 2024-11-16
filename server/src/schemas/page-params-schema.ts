import { z } from "zod";

export const PageParamsSchema = z.object({
  page: z.string().regex(/^[0-9]+$/, "Must be a numeric string"),
});

export type IPageParams = z.infer<typeof PageParamsSchema>;
