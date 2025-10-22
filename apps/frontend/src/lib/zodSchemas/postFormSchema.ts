import z from "zod";

export const postFormSchema = {
  title: z.string().min(5).max(100),
  content: z.string().min(20),
  tags: z
    .string()
    .min(1)
    .refine((value) => value.split(",").every((tag) => tag.trim() !== "")),
    thumbnail: z.instanceof(File).optional(),
    published: z.string().transform((val) => val === "on")
};
