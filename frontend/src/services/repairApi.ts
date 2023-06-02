import {
  Repair,
  RepairCreateRequest,
  RepairUpdateRequest,
  RepairUpdateResponse,
} from "../models/repairTypes";
import { RestResponse } from "../models/responseTypes";
import axiosInstance from "./base";

export const getRepairs = async (
  vehicleId: string
): Promise<RestResponse<Repair[]>> => {
  return await axiosInstance.get(`/auth/fault/${vehicleId}`);
};

export const createRepair = async (
  vehicleId: string,
  repair: RepairCreateRequest
): Promise<RestResponse<Repair>> => {
  return await axiosInstance.post(`/auth/fault/${vehicleId}`, repair);
};

export const updateRepair = async (
  vehicleId: string,
  repair: RepairUpdateRequest
): Promise<RestResponse<RepairUpdateResponse>> => {
  return await axiosInstance.patch(`/auth/fault/${vehicleId}`, repair);
};
