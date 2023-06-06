import { useMutation, useQuery, useQueryClient } from "react-query";
import { userApi } from "../services";

const getUnverifiedTechnicians = async () => {
  return await userApi.getUnverifiedTechnicians().then((response) => {
    return response.data;
  });
};

export const useUnverifiedTechnicians = () =>
  useQuery(["unverified_technicians"], getUnverifiedTechnicians);

const verifyTechnician = async (id: string) => {
  return await userApi.verifyTechnician(id).then((response) => {
    return response.data;
  });
};

export const useVerifyTechnician = () => {
  const queryClient = useQueryClient();
  const { mutate: verify } = useMutation(verifyTechnician, {
    onSuccess: () => queryClient.invalidateQueries(["unverified_technicians"]),
  });

  return { verify };
};
