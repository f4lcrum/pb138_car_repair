import express, { Request, Response } from "express";
import { userRegistrationSchema } from "../validationSchemas/user";
import { backendErrorRequestResponse, sendBadRequestResponse } from "../../repositories/common/responses";
import registerUser from "../../repositories/auth/register";
import { Prisma } from '@prisma/client';
const app = express();

const register = app.post('/auth/registration', async (req : Request, res : Response) => {
    const result = await userRegistrationSchema.safeParseAsync(req.body);
    if (!result.success) {
        return sendBadRequestResponse(res, result.error.message);
    }

    const output = await registerUser({ ...result.data });
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
    req.session.user = { id: user.id, role: user.role };
    res.json({ item: user, message: 'User ' + user.firstName.toString() + ' is authorized' });

  })

  export default register;