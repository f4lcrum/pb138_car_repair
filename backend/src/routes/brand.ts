import { Router } from 'express';
import { Role } from '@prisma/client';
import readBrands from '../controllers/brand/read';
import { authRoute } from './auth';
import auth from '../middleware/authMiddleware';
import createBrand from '../controllers/brand/create';
// import readSpecificBrands from '../controllers/brand/readSpecific';

const brandRouter = Router();
const brandRouterGeneric = `${authRoute}/brand`;
// const brandRouterSpecific = `${brandRouterGeneric}/specific`;

brandRouter.get(brandRouterGeneric, auth(Role.CLIENT, Role.ADMIN, Role.TECHNICIAN), readBrands);
brandRouter.post(brandRouterGeneric, auth(Role.ADMIN, Role.TECHNICIAN), createBrand);
// brandRouter.get(brandRouterSpecific,
// auth(Role.CLIENT, Role.ADMIN, Role.TECHNICIAN), readSpecificBrands);

export default brandRouter;
