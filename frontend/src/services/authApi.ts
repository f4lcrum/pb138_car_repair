import {
  AuthInfo,
  Credentials,
  LogInOutRequest,
  RegistrationRequest,
  RegistrationResponse,
} from "../models/authTypes";
import { RestResponse } from "../models/responseTypes";
import axiosInstance from "./base";

export const logIn = async (
  credentials: Credentials
): Promise<RestResponse<LogInOutRequest>> => {
  const response = await axiosInstance.post("/auth/login", credentials);
  return response.data;
};

export const logOut = async (): Promise<RestResponse<LogInOutRequest>> => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const register = async (
  registration: RegistrationRequest
): Promise<RestResponse<RegistrationResponse>> => {
  const response = await axiosInstance.post("/auth/registration", registration);
  return response.data;
};

export const readAuth = async (): Promise<RestResponse<AuthInfo>> => {
  const response = await axiosInstance.get("/auth/info");
  return response.data;
};
