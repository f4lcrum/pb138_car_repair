import express, { Request, Response } from 'express';
import { uuidSchema } from '../validationSchemas/common';
import { notFoundRequestResponse, sendBadRequestResponse } from '../../repositories/common/responses';


const app = express();


const readBrands = app.post('brand/:id', async (req: Request, res: Response) => {
    const parsedData = uuidSchema.safeParse(req.params);
    if (!parsedData.success) {
        return sendBadRequestResponse(res, 'Invalid input data');
    }
    const output = await all({ userId: parsedData.data.id });
    if (output.isErr) {
        return notFoundRequestResponse(res);
    }

})


export default readBrands;