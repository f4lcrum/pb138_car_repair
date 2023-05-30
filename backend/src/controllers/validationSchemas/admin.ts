import { z } from 'zod';

const verifyTechnicianSchema = z.object({
  email: z.string().email(),
});

export default verifyTechnicianSchema;
