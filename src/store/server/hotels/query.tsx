import {keepPreviousData, useQuery} from "@tanstack/react-query";
import { axios } from "@/common/util/axiox.ts";
import { authJsonToken } from "@/common/util/util.ts";
import {getPayload, transportationDataResponse, HotelDetailsProps} from "./typed";

const getHotels = async (payload: getPayload): Promise<transportationDataResponse> => {
  const { page, size, query } = payload;
  const { data } = await axios.get(`hotels`, {
    headers: authJsonToken(),
    params: { page, size, query },
  });

  return data;
};

export const useGetHotels = (payload: getPayload) => {
  return useQuery({
    queryKey: ["get-hotels", payload],
    queryFn: () => getHotels(payload),
    placeholderData: keepPreviousData,
  });
};

const getHotelById = async (id: string): Promise<HotelDetailsProps> => {
  const { data } = await axios.get(`hotels/${id}`, {
    headers: authJsonToken(),
  });
  return data;
};

export const useGetHotelById = (id: string) => {
  return useQuery({
    queryKey: ["get-hotels-by-id", id],
    queryFn: () => getHotelById(id),
  });
};