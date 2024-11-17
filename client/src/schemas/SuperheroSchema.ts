import { z, ZodType } from "zod"; // Add new import
import type { SuperheroFormData } from "../types/types";
export const SuperheroSchema: ZodType<SuperheroFormData> = z.object({
  nickname: z.string().min(1, { message: "required" }),
  real_name: z.string().min(1, { message: "required" }),
  origin_description: z.string().min(1, { message: "required" }),
  superpowers: z.string().min(1, { message: "required" }),
  catch_phrase: z.string().min(1, { message: "required" }),
});
