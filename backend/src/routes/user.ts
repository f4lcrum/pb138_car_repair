import { Router } from 'express';
import userController from '../controllers/user/index';
import { authRoute } from './auth';
import auth from '../middleware/authMiddleware';
import { Role } from '@prisma/client';

const userRouter = Router();
const userRouteGeneric = `${authRoute}/user`;
// const userRouteSpecific = `${userRouteGeneric}/:id`;

userRouter.patch(userRouteGeneric, auth(Role.CLIENT, Role.ADMIN, Role.TECHNICIAN), userController.updateUser);


export default userRouter;
