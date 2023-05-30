import { Router } from 'express';
import VehicleController from '../controllers/vehicle/index';
import { authRoute } from './auth';
import auth from '../middleware/authMiddleware';
import { Role } from '@prisma/client';

const vehicleRouter = Router();
const vehicleRouteGeneric = `${authRoute}/vehicle`;
const vehicleRouteGenericSearch = `${vehicleRouteGeneric}/search`
const vehicleRouteSpecific = `${vehicleRouteGeneric}/:id`;

vehicleRouter.get(vehicleRouteGeneric, auth(Role.CLIENT, Role.ADMIN), VehicleController.readVehicles);
vehicleRouter.delete(vehicleRouteSpecific, auth(Role.CLIENT, Role.ADMIN), VehicleController.deleteSpecificVehicle);
vehicleRouter.get(vehicleRouteGenericSearch, auth(Role.CLIENT, Role.ADMIN), VehicleController.readSpecificVehicle);
vehicleRouter.post(vehicleRouteGeneric, auth(Role.CLIENT), VehicleController.createVehicle);
export default vehicleRouter;
