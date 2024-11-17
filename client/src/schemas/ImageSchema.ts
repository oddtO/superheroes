import { z } from "zod"; // Add new import
import type { ZodError } from "zod";
const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const ImageSchema = z.object({
  file: z
    .instanceof(File)
    .refine((files) => files.size <= MAX_FILE_SIZE, `Max image size is 2MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
});

export type ImageFormData = z.infer<typeof ImageSchema>;
export type ImageValidationError = ZodError<ImageFormData>;
