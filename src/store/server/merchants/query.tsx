import { axios } from "../../../common/util/axiox";
import { authJsonToken } from "../../../common/util/util";
import { useQuery } from "@tanstack/react-query";
import { MerchantByIdProps, merchantProps } from "./typed";

interface paramsProps {
  query?: string;
  size?: number;
  page?: number;
}

const merchants = async (payload?: paramsProps): Promise<merchantProps> => {
  const { data } = await axios.get(`merchants`, {
    headers: authJsonToken(),
    params: payload,
  });

  return data;
};

export const useMerchants = (payload?: paramsProps) => {
  return useQuery({
    queryKey: ["merchant", payload],
    queryFn: () => merchants(payload),
  });
};

const merchantById = async (id: string): Promise<MerchantByIdProps> => {
  const { data } = await axios.get(`merchants/${id}`, {
    headers: authJsonToken(),
  });
  return data;
};

export const useMerchantById = (id: string) => {
  return useQuery({
    queryKey: ["merchant", id],
    queryFn: () => merchantById(id),
  });
};
