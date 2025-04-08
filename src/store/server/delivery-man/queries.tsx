import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../common/util/axiox";
import { authJsonToken } from "../../../common/util/util";
import { DeliveryProps } from "./typed";

interface deliProps {
  query: string;
  size: number;
  page: number;
}

const deliveryMan = async (payload: deliProps): Promise<DeliveryProps> => {
  const { data } = await axios.get(`delivery-men`, {
    headers: authJsonToken(),
    params: {
      query: payload.query,
      size: payload.size,
      page: payload.page,
    },
  });

  return data;
};

export const useDeliveryMan = (payload: deliProps) => {
  return useQuery({
    queryKey: ["delivery-man", payload],
    queryFn: () => deliveryMan(payload),
  });
};
