import { Router } from 'express';
import readBrands from '../controllers/brand/read';
import { authRoute } from './auth';
import { Role } from '@prisma/client';
import auth from '../middleware/authMiddleware';
// import readSpecificBrands from '../controllers/brand/readSpecific';

const brandRouter = Router();
const brandRouterGeneric = `${authRoute}/brand`;
// const brandRouterSpecific = `${brandRouterGeneric}/specific`;

brandRouter.get(brandRouterGeneric, auth(Role.CLIENT, Role.ADMIN, Role.TECHNICIAN), readBrands);
// brandRouter.get(brandRouterSpecific, auth(Role.CLIENT, Role.ADMIN, Role.TECHNICIAN), readSpecificBrands);

export default brandRouter;