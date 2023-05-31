import { Brand } from "../models/brandTypes";
import { RestResponse } from "../models/responseTypes";
import axiosInstance from "./base";

export const getBrands = async (): Promise<RestResponse<Brand[]>> => {
    return await axiosInstance.get('/auth/brand');
}