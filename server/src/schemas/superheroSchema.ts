import { z } from "zod";

export const SuperheroSchema = z.object({
  nickname: z.string({ required_error: "Nickname is required" }),
  real_name: z.string({ required_error: "Real name is required" }),
  origin_description: z.string({
    required_error: "Origin description is required",
  }),
  superpowers: z.string({ required_error: "Superpowers is required" }),
  catch_phrase: z.string({ required_error: "Catch phrase is required" }),
});

export type ISuperhero = z.infer<typeof SuperheroSchema>;
