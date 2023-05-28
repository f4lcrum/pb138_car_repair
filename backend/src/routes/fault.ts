import { Router } from 'express';
import FaultController from '../controllers/fault';
import { authRoute } from './auth';

const faultRouter = Router();
const faultRouteGeneric = `${authRoute}/fault`;
const faultRouteSpecific = `${faultRouteGeneric}/:id`;

faultRouter.post(faultRouteSpecific, FaultController.createFault);
faultRouter.patch(faultRouteSpecific, FaultController.updateFault);

export default faultRouter;
