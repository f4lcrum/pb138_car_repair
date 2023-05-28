import { Router } from "express";
import authController from '../controllers/auth/index';

const authRouter = Router();
export const authRoute = '/auth';
const authRouteRegister = `${authRoute}/registration`;
const authRouteLogin = `${authRoute}/login`;
const authRouteLogout = `${authRoute}/logout`;
const authRouteInfo = `${authRoute}/info`;


authRouter.post(authRouteLogin, authController.login);
authRouter.post(authRouteLogout, authController.logout);
authRouter.post(authRouteRegister, authController.register);
authRouter.get(authRouteInfo, authController.readAuth);


export default authRouter;