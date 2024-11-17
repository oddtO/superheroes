import { z } from "zod";
import { typeToFlattenedError } from "zod";

export const SuperheroSchema = z.object({
  nickname: z.string().min(1, { message: "required" }),
  real_name: z.string().min(1, { message: "required" }),
  origin_description: z.string().min(1, { message: "required" }),
  superpowers: z.string().min(1, { message: "required" }),
  catch_phrase: z.string().min(1, { message: "required" }),
});

export type ISuperhero = z.infer<typeof SuperheroSchema>;
export type IFieldErrors = typeToFlattenedError<ISuperhero>["fieldErrors"];
