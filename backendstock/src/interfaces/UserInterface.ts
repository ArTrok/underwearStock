import { z } from 'zod';

export const UserSchema = z.object({
  username: z.string(),
  password: z.string(),
  level: z.enum(['SuperUser', 'Admin', 'CommonUser']),
});

export type User = z.infer<typeof UserSchema>;