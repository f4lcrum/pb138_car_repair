import { Router } from 'express';
import VehicleController from '../controllers/vehicle/index';
import { authRoute } from './auth';

const vehicleRouter = Router();
const vehicleRouteGeneric = `${authRoute}/vehicle`;
const vehicleRouteSpecific = `${vehicleRouteGeneric}/:id`;

vehicleRouter.get(vehicleRouteGeneric, VehicleController.readVehicles);
vehicleRouter.delete(vehicleRouteSpecific, VehicleController.deleteSpecificVehicle);

export default vehicleRouter;
