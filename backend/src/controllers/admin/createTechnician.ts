import { Role } from '@prisma/client';
import express, { Request, Response } from 'express';
import auth from '../../middleware/authMiddleware';
import { userRegistrationSchema } from '../validationSchemas/user';
import { backendErrorRequestResponse, sendBadRequestResponse } from '../../repositories/common/responses';
import registerUser from '../../repositories/auth/register';


const app = express();


const createTechnician = app.post('/auth/admin', auth(Role.ADMIN), async (req: Request, res : Response) => {
    const bodyData = userRegistrationSchema.safeParse(req.body);
    if (!bodyData.success) {
        return sendBadRequestResponse(res, 'Invalid Body');
    }
    const output = await registerUser({...bodyData.data, role: Role.TECHNICIAN});
    if (output.isErr) {
        return backendErrorRequestResponse(res);
    }
    const user = output.unwrap();
    if (user === null) {
        return backendErrorRequestResponse(res);
    }
    res.json({ item: user, message: 'User ' + user.firstName.toString() + ' is created' });
})

export default createTechnician;