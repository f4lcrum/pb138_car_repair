import express, { Request, Response } from "express";
import auth from "../../middleware/authMiddleware";
import { backendErrorRequestResponse, notFoundRequestResponse } from "../../repositories/common/responses";
import read from "../../repositories/auth/read";

const app = express();

// info about current authentication
const readAuth = app.get('/auth/info', auth(), async(req : Request, res : Response) => {

    const output = await read({ req: req });
    if (output.isErr) {
      return backendErrorRequestResponse(res);
    }
    const user = output.unwrap();
    if (user === null) {
      return notFoundRequestResponse(res);
    }

    res.json({ item: user, message: 'User ' + user.firstName.toString() + ' is authorized'});
})

export default readAuth;