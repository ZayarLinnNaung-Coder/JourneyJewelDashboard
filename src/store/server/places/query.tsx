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
    queryKey: ["get-places", payload], // Keep this for list queries
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
    queryKey: ["get-place-by-id", id], // Changed from ["get-places", id] to avoid conflicts
    queryFn: () => getPlaceById(id),
    enabled: !!id, // Only run query if id exists
  });
};