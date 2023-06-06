import { useMutation, useQuery, useQueryClient } from "react-query";
import { brandApi } from "../services";
import { ModelCreateRequest } from "../models/brandTypes";

const getBrands = async () => {
  return await brandApi.getAllBrands().then((response) => {
    return response.data;
  });
};

export const useBrands = () => useQuery(["brands"], getBrands);

const createBrand = async (brandName: string) => {
  return await brandApi.createBrand({ name: brandName }).then((response) => {
    return response.data;
  });
};

export const useAddBrand = () => {
  const queryClient = useQueryClient();
  const { mutate: addBrand } = useMutation(createBrand, {
    onSuccess: () => {
      queryClient.invalidateQueries(["brands"]);
    },
  });

  return { addBrand };
};

interface createModelVariables {
  brandId: string;
  model: ModelCreateRequest;
}

const createModel = async ({ brandId, model }: createModelVariables) => {
  return await brandApi.createModel(brandId, model).then((response) => {
    return response.data;
  });
};

export const useAddModel = () => {
  const queryClient = useQueryClient();
  const { mutate: addModel } = useMutation(createModel, {
    onSuccess: () => {
      queryClient.invalidateQueries(["brands"]);
    },
  });

  return { addModel };
};
