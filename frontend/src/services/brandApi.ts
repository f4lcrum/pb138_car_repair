import { Brand } from "../models/brandTypes";
import { RestResponse } from "../models/responseTypes";
import axiosInstance from "./base";

export const getAllBrands = async (): Promise<RestResponse<Brand[]>> => {
  return await axiosInstance.get("/auth/brand");
};
