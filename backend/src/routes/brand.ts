import { Router } from 'express';
import readBrands from '../controllers/brand/read';

const brandRouter = Router();
const brandRouterGeneric = '/brand';
const brandRouterSpecific = `${brandRouterGeneric}/:id`;

brandRouter.get(brandRouterSpecific, readBrands);

export default brandRouter;