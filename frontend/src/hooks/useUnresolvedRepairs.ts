import { useQuery } from "react-query";
import { repairApi } from "../services";

const getUnresolvedRepairs = async () => {
  return await repairApi.getAllUnresolvedRepairs().then((response) => {
    return response.data;
  });
};

export const useUnresolvedRepairs = () =>
  useQuery(["unresolved_repairs"], getUnresolvedRepairs);
