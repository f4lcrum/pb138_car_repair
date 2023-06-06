import {
  Brand,
  BrandCreateRequest,
  BrandModel,
  ModelCreateRequest,
} from "../models/brandTypes";
import { RestResponse } from "../models/responseTypes";
import axiosInstance from "./base";

export const getAllBrands = async (): Promise<RestResponse<Brand[]>> => {
  const response = await axiosInstance.get("/auth/brand");
  return response.data;
};

export const createBrand = async (
  brand: BrandCreateRequest
): Promise<RestResponse<Brand>> => {
  const response = await axiosInstance.post("/auth/admin/brand", brand);
  return response.data;
};

export const createModel = async (
  brandId: string,
  model: ModelCreateRequest
): Promise<RestResponse<BrandModel>> => {
  const response = await axiosInstance.post(
    `/auth/admin/brand/${brandId}/brand-model`,
    model
  );
  return response.data;
};
