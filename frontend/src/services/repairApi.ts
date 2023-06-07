import {
  RepairCreateRequest,
  RepairUpdateRequest,
  RepairUpdateResponse,
  RepairWithDetails,
  RepairWithTechnician,
  SingleRepair,
} from "../models/repairTypes";
import { RestResponse } from "../models/responseTypes";
import axiosInstance from "./base";

export const getRepairs = async (
  vehicleId: string
): Promise<RestResponse<RepairWithTechnician[]>> => {
  const response = await axiosInstance.get(`/auth/fault/${vehicleId}`);
  return response.data;
};

export const getAllRepairs = async (
  unresolved: boolean
): Promise<RestResponse<RepairWithDetails[]>> => {
  const response = await axiosInstance.get(
    `/auth/fault?unresolved=${unresolved}`
  );
  return response.data;
};

export const createRepair = async (
  vehicleId: string,
  repair: RepairCreateRequest
): Promise<RestResponse<SingleRepair>> => {
  const response = await axiosInstance.post(`/auth/fault/${vehicleId}`, repair);
  return response.data;
};

export const updateRepair = async (
  id: string,
  repair: RepairUpdateRequest
): Promise<RestResponse<RepairUpdateResponse>> => {
  const response = await axiosInstance.patch(`/auth/fault/${id}`, repair);
  return response.data;
};

export const assignRepair = async (
  id: string
): Promise<RestResponse<RepairUpdateResponse>> => {
  const response = await axiosInstance.patch(`/auth/fault/assignment/${id}`);
  return response.data;
};
