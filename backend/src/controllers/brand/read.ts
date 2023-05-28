import express, { Request, Response } from 'express';
import { notFoundRequestResponse } from '../../repositories/common/responses';
import { Role } from '@prisma/client';
import auth from '../../middleware/authMiddleware';


const app = express();

const readBrands = app.get('/auth/brand', auth(Role.CLIENT, Role.ADMIN, Role.TECHNICIAN), async (req: Request, res: Response) => {
    const output = await all();
    if (output.isErr) {
        return notFoundRequestResponse(res);
    }

})


export default readBrands;