import { z } from 'zod';
import { VehicleSchema } from './VehicleInterface';

const BaseCarSchema = z.object({
  doorsQty: z.number().min(2).max(4),
  seatsQty: z.number().min(2).max(7),
});

export const CarSchema = BaseCarSchema.merge(VehicleSchema);
export type Car = z.infer<typeof CarSchema>;