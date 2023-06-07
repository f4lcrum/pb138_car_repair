import { useMutation, useQuery, useQueryClient } from "react-query";
import { authApi, userApi } from "../services";
import { Credentials, RegistrationRequest } from "../models/authTypes";
import { UserUpdateRequest } from "../models/userTypes";
import { NavigateFunction } from "react-router-dom";

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

export const useLogIn = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();
  const { mutate: logIn } = useMutation(login, {
    onSuccess: () => {
      navigate("/home");
      queryClient.invalidateQueries(["auth"]);
    },
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
    onSuccess: () => queryClient.clear(),
  });

  return { logOut };
};

const registerUser = async (registration: RegistrationRequest) => {
  return await authApi.register(registration).then((response) => {
    return response.data;
  });
};

export const useRegistration = (navigate: NavigateFunction) => {
  const queryClient = useQueryClient();
  const { mutate: register } = useMutation(registerUser, {
    onSuccess: () => {
      navigate("/home"), queryClient.invalidateQueries(["auth"]);
    },
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
