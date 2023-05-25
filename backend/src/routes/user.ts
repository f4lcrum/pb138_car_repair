import { Router } from 'express';
import userController from '../controllers/user/index';

const userRouter = Router();
const userRouteGeneric = '/user';
const userRouteSpecific = `${userRouteGeneric}/:id`;

userRouter.patch(userRouteSpecific, userController.updateUser);
// vehicleRouter.delete(vehicleRouteSpecific, VehicleController.deleteSpecificVehicle);

export default userRouter;
