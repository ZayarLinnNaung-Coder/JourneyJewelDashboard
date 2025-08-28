import { z } from "zod";

export const formSchemaSchema = z.object({
  name: z.string(),
  place: z.string(),
  minBudget: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  placeType: z.string(),
  additionalImages: z.array(z.object({
    url: z.string().url("Please enter a valid URL")
  })).default([]),
});
