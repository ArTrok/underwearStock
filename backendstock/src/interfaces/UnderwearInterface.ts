import { z } from 'zod';

export const UnderwearSchema = z.object({
  item: z.string(),
  color: z.string(),
  size: z.string().max(2),
  quantity: z.number().int(),
  costValue: z.number(),
  sellValue: z.number(),
});

export type Underwear = z.infer<typeof UnderwearSchema>;
