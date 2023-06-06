import { RestResponse } from "../models/responseTypes";
import {
  SingleVehicle,
  SingleVehicleQueryParams,
  VehicleCreateRequest,
  VehicleWithBrand,
} from "../models/vehicleTypes";
import axiosInstance from "./base";

export const createVehicle = async (
  vehicle: VehicleCreateRequest
): Promise<RestResponse<SingleVehicle>> => {
  const response = await axiosInstance.post("/auth/vehicle", vehicle);
  return response.data;
};

export const deleteVehicle = async (
  id: string
): Promise<RestResponse<SingleVehicle>> => {
  const response = await axiosInstance.delete(`/auth/vehicle/${id}`);
  return response.data;
};

export const getVehicle = async (
  queryParams: SingleVehicleQueryParams
): Promise<RestResponse<SingleVehicle>> => {
  const response = await axiosInstance.get("/auth/vehicle/search", {
    params: queryParams,
  });
  return response.data;
};

export const getAllVehicles = async (
  queryParams: URLSearchParams
): Promise<RestResponse<VehicleWithBrand[]>> => {
  const response = await axiosInstance.get("/auth/vehicle", {
    params: queryParams,
  });
  return response.data;
};
