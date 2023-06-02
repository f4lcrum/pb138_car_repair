import { Router } from 'express';
import { Role } from '@prisma/client';
import readBrands from '../controllers/brand/read';
import { authRoute } from './auth';
import auth from '../middleware/authMiddleware';

const brandRouter = Router();
const brandRouterGeneric = `${authRoute}/brand`;

brandRouter.get(brandRouterGeneric, auth(Role.CLIENT, Role.ADMIN, Role.TECHNICIAN), readBrands);

export default brandRouter;
