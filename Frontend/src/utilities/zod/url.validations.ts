import { z } from "zod";

export const UrlSchema = z.object({
  url: z.string().url({
    message: "Please enter a valid url",
  }),
  //just letters and numbers
  shortUrl: z
    .string()
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "just letters and numbers",
    })
    .max(10, {
      message: "Short url must be at most 10 characters long",
    }),
  description: z
    .string()
    .max(100, {
      message: "Description must be at most 100 characters long",
    })
    .optional(),
});
