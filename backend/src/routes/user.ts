import { Router } from 'express';
import { Role } from '@prisma/client';
import userController from '../controllers/user/index';
import { authRoute } from './auth';
import auth from '../middleware/authMiddleware';

const userRouter = Router();
const userRouteGeneric = `${authRoute}/user`;

userRouter.patch(
  userRouteGeneric,
  auth(
    Role.CLIENT,
    Role.ADMIN,
    Role.TECHNICIAN,
  ),

  userController.updateUser,
);

export default userRouter;
