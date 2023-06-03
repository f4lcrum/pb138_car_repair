import { Router } from 'express';
import { Role } from '@prisma/client';
import FaultController from '../controllers/fault';
import { authRoute } from './auth';
import auth from '../middleware/authMiddleware';

const faultRouter = Router();
const faultRouteGeneric = `${authRoute}/fault`;
const faultRouteSpecific = `${faultRouteGeneric}/:id`;
const faultRouteAssign = `${faultRouteGeneric}/assignment/:id`;
const faultRouteAll = `${authRoute}/fault/unresolved/all`;

faultRouter.get(faultRouteSpecific, auth(Role.CLIENT, Role.ADMIN), FaultController.readFault);
faultRouter.post(faultRouteSpecific, auth(Role.CLIENT, Role.ADMIN), FaultController.createFault);
faultRouter.patch(
  faultRouteSpecific,
  auth(Role.TECHNICIAN, Role.ADMIN),
  FaultController.updateFault,
);
faultRouter.patch(
  faultRouteAssign,
  auth(Role.TECHNICIAN, Role.ADMIN),
  FaultController.assign,
);

faultRouter.get(
  faultRouteAll,
  auth(Role.TECHNICIAN, Role.ADMIN),
  FaultController.readAllFaults,
);

export default faultRouter;
