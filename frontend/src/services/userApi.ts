import { RestResponse } from "../models/responseTypes";
import { UserUpdateRequest, UserUpdateResponse } from "../models/userTypes";
import axiosInstance from "./base"

export const updateUser = async (id: string, updatedUser: UserUpdateRequest): Promise<RestResponse<UserUpdateResponse>> => {
    return await axiosInstance.patch(`/user/${id}`, updatedUser);
}