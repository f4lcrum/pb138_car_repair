import type { Request, Response } from "express";
import { userLoginSchema } from "../validationSchemas/user";
import { backendErrorRequestResponse, receivedRequestResponse, sendBadRequestResponse, unauthorizedRequestResponse } from "../../repositories/common/responses";
import userInfo from "../../repositories/auth/login";
import argon2 from 'argon2';
import { genericError } from "../../repositories/common/types";


const login =  async (req : Request, res : Response) => {
    try {
        const result = await userLoginSchema.safeParseAsync(req.body);
        if (!result.success) {
            return sendBadRequestResponse(res, result.error.message);
        }

        const { email, password } = result.data;
        const output = await userInfo({email: email });
        if (output.isErr) {
            return backendErrorRequestResponse(res);
        }
        const user = output.unwrap();
        if (user === null) {
            return sendBadRequestResponse(res, 'User does not exist');
        }
        const isVerified = await argon2.verify(user.password, password);
        if (!isVerified) {
            return unauthorizedRequestResponse(res, 'Wrong password');
        }
        req.session.user = { id: user.id, role: user.role };
        return receivedRequestResponse(res, {message: 'Logged in'});
  } catch (e) {
    return genericError;
  }
}

export default login;