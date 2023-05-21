import { Router } from 'express';
import VehicleController from '../controllers/vehicle/index';

const vehicleRouter = Router();
const vehicleRouteGeneric = '/vehicle';
const vehicleRouteSpecific = `${vehicleRouteGeneric}/:id`;

vehicleRouter.get(vehicleRouteGeneric, VehicleController.readVehicles);
vehicleRouter.delete(vehicleRouteSpecific, VehicleController.deleteSpecificVehicle);

export default vehicleRouter;
