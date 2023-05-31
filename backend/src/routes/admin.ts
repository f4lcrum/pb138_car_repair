import { Router } from 'express';
import { Role } from '@prisma/client';
import adminController from '../controllers/admin/index';
import { authRoute } from './auth';
import auth from '../middleware/authMiddleware';

const adminRouter = Router();
const adminRoute = `${authRoute}/admin/technician`;
const adminRouteVerify = `${adminRoute}/verification`;
const adminRouteCreateBrand = `${authRoute}/admin/brand`;
const adminRouteBrandModel = `${authRoute}/admin/brand/:id/brand-model`;

adminRouter.post(adminRouteVerify, auth(Role.ADMIN), adminController.verify);
adminRouter.get(adminRoute, auth(Role.ADMIN), adminController.readUnverified);
adminRouter.post(adminRouteCreateBrand, auth(Role.ADMIN), adminController.createBrand);
adminRouter.post(adminRouteBrandModel, auth(Role.ADMIN), adminController.createBrandModel);
export default adminRouter;
