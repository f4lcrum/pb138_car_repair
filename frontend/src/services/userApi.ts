import { RestResponse } from "../models/responseTypes";
import {
  Technician,
  TechnicianVerifyResponse,
  UserUpdateRequest,
  UserUpdateResponse,
} from "../models/userTypes";
import axiosInstance from "./base";

export const updateUser = async (
  updatedUser: UserUpdateRequest
): Promise<RestResponse<UserUpdateResponse>> => {
  const response = await axiosInstance.patch("/auth/user", updatedUser);
  return response.data;
};

export const getUnverifiedTechnicians = async (): Promise<
  RestResponse<Technician[]>
> => {
  const response = await axiosInstance.get("/auth/admin/technician");
  return response.data;
};

export const verifyTechnician = async (
  id: string
): Promise<RestResponse<TechnicianVerifyResponse>> => {
  const response = await axiosInstance.post(
    `/auth/admin/technician/verification/${id}`
  );
  return response.data;
};
