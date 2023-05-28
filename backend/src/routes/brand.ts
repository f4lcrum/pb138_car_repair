import { Router } from 'express';
import readBrands from '../controllers/brand/read';
import { authRoute } from './auth';

const brandRouter = Router();
const brandRouterGeneric = `${authRoute}/brand`;
const brandRouterSpecific = `${brandRouterGeneric}/:id`;

brandRouter.get(brandRouterSpecific, readBrands);

export default brandRouter;