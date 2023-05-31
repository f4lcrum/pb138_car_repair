import { RestResponse } from "../models/responseTypes";
import { ManyVehicleQueryParams, SingleVehicleQueryParams, Vehicle, VehicleCreate } from "../models/vehicleTypes";
import axiosInstance from "./base";

export const createVehicle = async (vehicle: VehicleCreate): Promise<RestResponse<Vehicle>> => {
    return await axiosInstance.post('/auth/vehicle', vehicle);
}

export const deleteVehicle = async (id: string): Promise<RestResponse<Vehicle>> => {
    return await axiosInstance.delete(`/auth/vehicle/${id}`);
}

export const getVehicle = async (queryParams: SingleVehicleQueryParams): Promise<RestResponse<Vehicle>> => {
    return await axiosInstance.get('/auth/vehicle/search', {params: queryParams});
}

export const getAllVehicles = async (queryParams: ManyVehicleQueryParams): Promise<RestResponse<Vehicle[]>> => {
    return await axiosInstance.get('/auth/vehicle', {params: queryParams});
}