import {keepPreviousData, useQuery} from "@tanstack/react-query";
import { axios } from "@/common/util/axiox.ts";
import { authJsonToken } from "@/common/util/util.ts";
import {getPayload, transportationDataResponse, PlaceDetailsProps} from "./typed";

const getTransportations = async (payload: getPayload): Promise<transportationDataResponse> => {
  const { page, size, query } = payload;
  const { data } = await axios.get(`transportations`, {
    headers: authJsonToken(),
    params: { page, size, query },
  });

  return data;
};

export const useGetTransportations = (payload: getPayload) => {
  return useQuery({
    queryKey: ["get-transportations", payload],
    queryFn: () => getTransportations(payload),
    placeholderData: keepPreviousData,
  });
};

const getTransportationById = async (id: string): Promise<PlaceDetailsProps> => {
  const { data } = await axios.get(`transportations/${id}`, {
    headers: authJsonToken(),
  });
  return data;
};

export const useGetTransportationById = (id: string) => {
  return useQuery({
    queryKey: ["get-transportations-by-id", id],
    queryFn: () => getTransportationById(id),
  });
};