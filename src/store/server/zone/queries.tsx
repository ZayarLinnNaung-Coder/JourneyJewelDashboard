import { axios } from "@/common/util/axiox";
import { authJsonToken } from "@/common/util/util";
import { useQuery } from "@tanstack/react-query";
import { ZoneIdProps, ZoneProps } from "./typd";

interface payloadPara {
  query?: string;
  page?: number;
  size?: number;
}

const getAllZone = async (payload?: payloadPara): Promise<ZoneProps> => {
  const { data } = await axios.get(`zones`, {
    headers: authJsonToken(),
    params: {
      query: payload?.query,
      page: payload?.page,
      size: payload?.size,
    },
  });
  return data;
};

export const useGetAllZone = (payload?: payloadPara) => {
  return useQuery({
    queryKey: ["zone"],
    queryFn: () => getAllZone(payload),
  });
};

const getZoneById = async (id: string): Promise<ZoneIdProps> => {
  const { data } = await axios.get(`zones/${id}`, {
    headers: authJsonToken(),
  });
  return data;
};

export const useGetZoneById = (id: string) => {
  return useQuery({
    queryKey: ["zone-id", id],
    queryFn: () => getZoneById(id),
  });
};
