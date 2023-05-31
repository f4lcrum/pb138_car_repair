import { AuthInfo, Credentials, RegistrationRequest } from "../models/authTypes";
import { RestResponse } from "../models/responseTypes";
import axiosInstance from "./base";

//todo change 'any' to actual type
export const logIn = async (credentials: Credentials): Promise<RestResponse<any>> => {
    return await axiosInstance.post('/auth/login', credentials);
}

//todo change 'any' to actual type
export const logOut = async (): Promise<RestResponse<any>> => {
    return await axiosInstance.post('/auth/logout');
}

//todo change 'any' to actual type
export const register = async (registration: RegistrationRequest): Promise<RestResponse<any>> => {
    return await axiosInstance.post('/auth/registration', registration);
}

export const readAuth = async (): Promise<RestResponse<AuthInfo>> => {
    return await axiosInstance.get('/auth/info');
}