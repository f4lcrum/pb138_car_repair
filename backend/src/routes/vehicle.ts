import { Router } from 'express';
import { Role } from '@prisma/client';
import VehicleController from '../controllers/vehicle/index';
import { authRoute } from './auth';
import auth from '../middleware/authMiddleware';

const vehicleRouter = Router();
const vehicleRouteGeneric = `${authRoute}/vehicle`;
const vehicleRouteGenericSearch = `${vehicleRouteGeneric}/search`;
const vehicleRouteSpecific = `${vehicleRouteGeneric}/:id`;

vehicleRouter.get(
  vehicleRouteGeneric,
  auth(Role.CLIENT),

  VehicleController.readVehicles,
);
vehicleRouter.delete(
  vehicleRouteSpecific,
  auth(Role.CLIENT),

  VehicleController.deleteSpecificVehicle,
);
vehicleRouter.get(
  vehicleRouteGenericSearch,
  auth(Role.CLIENT, Role.ADMIN),

  VehicleController.readSpecificVehicle,
);
vehicleRouter.post(vehicleRouteGeneric, auth(Role.CLIENT), VehicleController.createVehicle);
export default vehicleRouter;
