import { Prisma, Role } from '@prisma/client';
import type { Request, Response } from 'express';

import { userRegistrationSchema } from '../validationSchemas/user';
import { backendErrorRequestResponse, sendBadRequestResponse } from '../../repositories/common/responses';
import registerUser from '../../repositories/auth/register';



const createTechnician = async (req: Request, res : Response) => {
    const bodyData = userRegistrationSchema.safeParse(req.body);
    if (!bodyData.success) {
        return sendBadRequestResponse(res, 'Invalid Body');
    }
    const output = await registerUser({...bodyData.data, role: Role.TECHNICIAN});
    if (output.isErr) {
        if (output.error instanceof Prisma.PrismaClientKnownRequestError && output.error.code === 'P2002') {
            return sendBadRequestResponse(res, 'Email is already in use!');
          }
        return backendErrorRequestResponse(res);
    }
    const user = output.unwrap();
    if (user === null) {
        return backendErrorRequestResponse(res);
    }
    res.json({ item: user, message: 'User ' + user.firstName.toString() + ' is created' });
}

export default createTechnician;