import { Router } from "express";
import adminController from '../controllers/admin/index';
import { authRoute } from "./auth";
import auth from "../middleware/authMiddleware";
import { Role } from "@prisma/client";

const adminRouter = Router();
const adminRoute = `${authRoute}/admin/technician`;


adminRouter.post(adminRoute, auth(Role.ADMIN), adminController.createTechnician);

export default adminRouter;