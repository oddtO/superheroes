import { z } from "zod"; // Add new import

export const SuperheroSchema = z.object({
  nickname: z.string().min(1, { message: "required" }),
  real_name: z.string().min(1, { message: "required" }),
  origin_description: z.string().min(1, { message: "required" }),
  superpowers: z.string().min(1, { message: "required" }),
  catch_phrase: z.string().min(1, { message: "required" }),
  images: z.array(z.instanceof(File)).or(z.undefined()).optional(),
  /* .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max image size is 2MB.`,
    )
    .refine(kk
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ), */
});

export type SuperheroFormData = z.infer<typeof SuperheroSchema>;
