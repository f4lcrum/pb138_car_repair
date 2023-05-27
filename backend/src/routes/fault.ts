import { Router } from 'express';
import FaultController from '../controllers/fault';

const faultRouter = Router();
const faultRouteGeneric = '/fault';
const faultRouteSpecific = `${faultRouteGeneric}/:id`;

faultRouter.post(faultRouteSpecific, FaultController.createFault);

export default faultRouter;