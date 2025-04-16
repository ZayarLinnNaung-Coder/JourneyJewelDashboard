import {keepPreviousData, useQuery} from "@tanstack/react-query";
import { axios } from "@/common/util/axiox.ts";
import { authJsonToken } from "@/common/util/util.ts";
import {getPayload, placeDataProps, PlaceDetailsProps} from "./typed";

const getPlaces = async (payload: getPayload): Promise<placeDataProps> => {
  const { page, size, query } = payload;
  const { data } = await axios.get(`places`, {
    headers: authJsonToken(),
    params: { page, size, query },
  });

  return data;
};

export const useGetPlaces = (payload: getPayload) => {
  return useQuery({
    queryKey: ["get-places", payload],
    queryFn: () => getPlaces(payload),
    placeholderData: keepPreviousData,
  });
};

const getPlaceById = async (id: string): Promise<PlaceDetailsProps> => {
  const { data } = await axios.get(`places/${id}`, {
    headers: authJsonToken(),
  });
  return data;
};

export const useGetPlaceById = (id: string) => {
  return useQuery({
    queryKey: ["place", id],
    queryFn: () => getPlaceById(id),
  });
};