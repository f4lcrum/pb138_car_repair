import { Router } from 'express';
import { Role } from '@prisma/client';
import adminController from '../controllers/admin/index';
import { authRoute } from './auth';
import auth from '../middleware/authMiddleware';

const adminRouter = Router();
const adminRoute = `${authRoute}/admin/technician`;
const adminRouteVerify = `${adminRoute}/verification`;

console.log(adminRouteVerify);
adminRouter.post(adminRouteVerify, auth(Role.ADMIN), adminController.verify);
adminRouter.get(adminRoute, auth(Role.ADMIN), adminController.readUnverified);

export default adminRouter;
