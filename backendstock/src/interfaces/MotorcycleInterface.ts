import { z } from 'zod';
import { VehicleSchema } from './VehicleInterface';

const BaseMotorcycleSchema = z.object({
  category: z.enum(['Trail', 'Street', 'Custom']),
  engineCapacity: z.number().min(1).max(2500),
});

export const MotorcycleSchema = BaseMotorcycleSchema.merge(VehicleSchema);
export type Motorcycle = z.infer<typeof MotorcycleSchema>;