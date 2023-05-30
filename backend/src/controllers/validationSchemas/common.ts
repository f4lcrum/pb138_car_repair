import { z } from 'zod';

const uuidSchema = z.object({
  id: z.string().uuid(),
}).strict();

export default uuidSchema;
