import { useMutation, useQuery, useQueryClient } from "react-query";
import { authApi, userApi } from "../services";
import { Credentials, RegistrationRequest } from "../models/authTypes";
import { UserUpdateRequest } from "../models/userTypes";

const getAuthInfo = async () => {
  return await authApi.readAuth().then((response) => {
    return response.data;
  });
};

export const useAuth = () => useQuery(["auth"], getAuthInfo);

const login = async (credentials: Credentials) => {
  return await authApi.logIn(credentials).then((response) => {
    return response.data;
  });
};

export const useLogIn = () => {
  const queryClient = useQueryClient();
  const { mutate: logIn } = useMutation(login, {
    onSuccess: () => queryClient.invalidateQueries(["auth"]),
  });

  return { logIn };
};

const logout = async () => {
  return await authApi.logOut().then((response) => {
    return response.data;
  });
};

export const useLogOut = () => {
  const queryClient = useQueryClient();
  const { mutate: logOut } = useMutation(logout, {
    onSuccess: () => queryClient.invalidateQueries(["auth"]),
  });

  return { logOut };
};

const registerUser = async (registration: RegistrationRequest) => {
  return await authApi.register(registration).then((response) => {
    return response.data;
  });
};

export const useRegistration = () => {
  const queryClient = useQueryClient();
  const { mutate: register } = useMutation(registerUser, {
    onSuccess: () => queryClient.invalidateQueries(["auth"]),
  });

  return { register };
};

const updateUser = async (updatedUser: UserUpdateRequest) => {
  return await userApi.updateUser(updatedUser).then((response) => {
    return response.data;
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { mutate: update } = useMutation(updateUser, {
    onSuccess: () => queryClient.invalidateQueries(["auth"]),
  });

  return { update };
};
