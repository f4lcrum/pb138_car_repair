import { Router } from "express";
import argon2 from 'argon2';
import auth from "../middleware/authMiddleware";
import client from "../client";
import { userLoginSchema, userRegistrationSchema } from "../controllers/validationSchemas/user";
import { backendErrorRequestResponse, notFoundRequestResponse, receivedRequestResponse, sendBadRequestResponse, unauthorizedRequestResponse } from "../repositories/common/responses";
const authRouter = Router();

// info about the current authentication:
authRouter.get('/', auth(), async(req, res) => {
  const email = req.session.user!.email;
  const user = await client.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true, 
      email: true,
      role: true,
    },
  });
  if (user === null) {
    return notFoundRequestResponse(res);
  }
  res.json({ item: user, message: 'User ' + user.firstName.toString() + ' is authorized'});
})

// registration:
authRouter.post('/registration', async (req, res) => {
  const result = await userRegistrationSchema.safeParseAsync(req.body);
  if (!result.success) {
    return sendBadRequestResponse(res, result.error.message);
  }
  
  const { password, ...userData} = result.data;
  const hash = await argon2.hash(password);
  const user = await client.user.create({
    data: {
       ...userData, 
       password: hash,
       createdAt: new Date(),
       isVerified: false,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
    }
  });
  if (user === null) {
    return backendErrorRequestResponse(res);
  }
  res.json({ item: user, message: 'User ' + user.firstName.toString() + ' is authorized' });
})



// login:
authRouter.post('/login', async (req, res) => {
  const result = await userLoginSchema.safeParseAsync(req.body);
  if (!result.success) {
    return sendBadRequestResponse(res, result.error.message);
  }

  const { email, password } = result.data;
  const user = await client.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return sendBadRequestResponse(res, 'User does not exist');
  }

  const isVerified = argon2.verify(user.password, password);
  if (!isVerified) {
    return unauthorizedRequestResponse(res, 'Wrong password');
  }
  req.session.user = { email: user.email, role: user.role };
  return receivedRequestResponse(res, {message: 'Logged in'});
})


// logout:

authRouter.post('/logout', async (req, res) => {
  req.session.destroy(() => {});
  return receivedRequestResponse(res, {message: 'Logged out'});
});

export default authRouter;