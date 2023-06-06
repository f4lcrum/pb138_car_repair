import { useMutation, useQuery, useQueryClient } from "react-query";
import { repairApi } from "../services";
import {
  RepairCreateRequest,
  RepairUpdateRequest,
} from "../models/repairTypes";

//todo what about the type?
const getRepairs = async (vehicleId: string) => {
  return await repairApi.getRepairs(vehicleId).then((response) => {
    return response.data;
  });
};

export const useRepairs = (vehicleId: string) =>
  useQuery(["repairs", vehicleId], () => getRepairs(vehicleId));

interface createRepairVariables {
  vehicleId: string;
  repair: RepairCreateRequest;
}

const createRepair = async ({ vehicleId, repair }: createRepairVariables) => {
  return await repairApi.createRepair(vehicleId, repair).then((response) => {
    return response.data;
  });
};

export const useAddRepair = (vehicleId: string) => {
  const queryClient = useQueryClient();
  const { mutate: addRepair } = useMutation(createRepair, {
    onSuccess: () => {
      queryClient.invalidateQueries(["repairs", vehicleId]);
    },
  });

  return { addRepair };
};

interface updateRepairVariables {
  id: string;
  repair: RepairUpdateRequest;
}

const modifyRepair = async ({ id, repair }: updateRepairVariables) => {
  return await repairApi.updateRepair(id, repair).then((response) => {
    return response.data;
  });
};

export const useUpdateRepair = (vehicleId: string) => {
  const queryClient = useQueryClient();
  const { mutate: updateRepair } = useMutation(modifyRepair, {
    onSuccess: () => {
      queryClient.invalidateQueries(["repairs", vehicleId]);
    },
  });

  return { updateRepair };
};
