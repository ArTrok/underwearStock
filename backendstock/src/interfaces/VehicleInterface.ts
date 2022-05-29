import { z } from 'zod';

export const VehicleSchema = z.object({
  // _id: z.string().min(24, 'Id must have 24 hexadecimal characters').optional(),
  model: z.string(),
  year: z.number().min(1900).max(2022),
  color: z.string().min(3),
  status: z.boolean().optional(),
  buyValue: z.number().int(),
});

export type Vehicle = z.infer<typeof VehicleSchema>;
