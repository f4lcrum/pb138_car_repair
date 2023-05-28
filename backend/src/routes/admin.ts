import { Router } from "express";
import adminController from '../controllers/admin/index';

const adminRouter = Router();
const adminRoute = '/admin';


adminRouter.post(adminRoute, adminController.createTechnician);

export default adminRouter;