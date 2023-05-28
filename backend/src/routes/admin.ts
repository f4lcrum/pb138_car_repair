import { Router } from "express";
import adminController from '../controllers/admin/index';
import { authRoute } from "./auth";

const adminRouter = Router();
const adminRoute = `${authRoute}/admin`;


adminRouter.post(adminRoute, adminController.createTechnician);

export default adminRouter;