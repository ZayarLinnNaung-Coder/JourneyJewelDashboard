import {keepPreviousData, useQuery} from "@tanstack/react-query";
import { axios } from "@/common/util/axiox.ts";
import { authJsonToken } from "@/common/util/util.ts";
import {getPayload, transportationDataResponse, PackagesDetailsProps} from "./typed";

const getpackages = async (payload: getPayload): Promise<transportationDataResponse> => {
  const { page, size, query } = payload;
  const { data } = await axios.get(`packages`, {
    headers: authJsonToken(),
    params: { page, size, query },
  });

  return data;
};

export const useGetpackages = (payload: getPayload) => {
  return useQuery({
    queryKey: ["get-packages", payload],
    queryFn: () => getpackages(payload),
    placeholderData: keepPreviousData,
  });
};

const getpackagesById = async (id: string): Promise<PackagesDetailsProps> => {
  const { data } = await axios.get(`packages/${id}`, {
    headers: authJsonToken(),
  });
  return data;
};

export const useGetpackagesById = (id: string) => {
  return useQuery({
    queryKey: ["get-packages-by-id", id],
    queryFn: () => getpackagesById(id),
  });
};