import { Router } from 'express';
import userController from '../controllers/user/index';
import { authRoute } from './auth';

const userRouter = Router();
const userRouteGeneric = `${authRoute}/user`;
const userRouteSpecific = `${userRouteGeneric}/:id`;

userRouter.patch(userRouteSpecific, userController.updateUser);


export default userRouter;
