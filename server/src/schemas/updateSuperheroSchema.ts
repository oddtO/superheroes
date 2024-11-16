import { SuperheroSchema } from "./superheroSchema";

import { z } from "zod";

export const UpdateSuperheroSchema = SuperheroSchema.extend({
  idsImageToDelete: z
    .union([
      z.string().regex(/^[0-9]+$/, "Must be a numeric string"),
      z.array(z.string().regex(/^[0-9]+$/, "Must be a numeric string")),
    ])
    .optional(),
});
export type UpdateSuperhero = z.infer<typeof UpdateSuperheroSchema>;
