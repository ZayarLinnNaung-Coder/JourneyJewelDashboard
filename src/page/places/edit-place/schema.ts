import { z } from "zod";

export const formSchemaSchema = z.object({
  name: z.string(),
  place: z.string(),
  minBudget: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  placeType: z.string()
});
