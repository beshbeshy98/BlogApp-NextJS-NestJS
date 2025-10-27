import { z } from "zod";

export const postFormSchema = z.object({
  postId: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(parseInt(val)))
    .transform((val) => (val ? parseInt(val) : undefined)),
  title: z.string().min(5).max(100),
  content: z.string().min(20),
  tags: z
    .string()
    .min(1)
    .refine((value) => value.split(",").every((tag) => tag.trim() !== ""))
    .transform((val) => val.split(",")),
  thumbnail: z.any().optional(),
  published: z
    .any()
    .transform((val) => val === "on")
    .pipe(z.boolean()),
});
