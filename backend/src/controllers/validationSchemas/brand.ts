import { z } from 'zod';

const createBrandSchema = z.object({
  name: z.string().nonempty(),
}).strict();

export default createBrandSchema;
