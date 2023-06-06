import { useMutation, useQuery, useQueryClient } from "react-query";
import { vehicleApi } from "../services";
import { VehicleCreateRequest } from "../models/vehicleTypes";

const getVehicles = async (searchParams: URLSearchParams) => {
  return await vehicleApi.getAllVehicles(searchParams).then((response) => {
    return response.data;
  });
};

export const useVehicles = (searchParams: URLSearchParams) =>
  useQuery(["vehicles"], () => getVehicles(searchParams));

const createVehicle = async (vehicle: VehicleCreateRequest) => {
  return await vehicleApi.createVehicle(vehicle).then((response) => {
    return response.data;
  });
};

export const useAddVehicle = () => {
  const queryClient = useQueryClient();
  const { mutate: addVehicle } = useMutation(createVehicle, {
    onSuccess: () => {
      queryClient.invalidateQueries(["vehicles"]);
    },
  });

  return { addVehicle };
};

const deleteVehicle = async (id: string) => {
  return await vehicleApi.deleteVehicle(id).then((response) => {
    return response.data;
  });
};

export const useRemoveVehicle = () => {
  const queryClient = useQueryClient();
  const { mutate: removeVehicle } = useMutation(deleteVehicle, {
    onSuccess: () => queryClient.invalidateQueries(["vehicles"]),
  });

  return { removeVehicle };
};
