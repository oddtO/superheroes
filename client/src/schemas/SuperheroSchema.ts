import { z } from "zod"; // Add new import

export const SuperheroSchema = z.object({
  nickname: z.string().min(1, { message: "required" }),
  real_name: z.string().min(1, { message: "required" }),
  origin_description: z.string().min(1, { message: "required" }),
  superpowers: z.string().min(1, { message: "required" }),
  catch_phrase: z.string().min(1, { message: "required" }),
  images: z.array(z.instanceof(File)).or(z.undefined()).optional(),
});

export type SuperheroFormData = z.infer<typeof SuperheroSchema>;

export const UpdateSuperheroSchema = SuperheroSchema.extend({
  idsImageToDelete: z.array(z.string()).or(z.undefined()).optional(),
});

export type UpdateSuperheroFormData = z.infer<typeof UpdateSuperheroSchema>;
