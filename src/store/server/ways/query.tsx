import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../common/util/axiox";
import { authJsonToken } from "../../../common/util/util";
import { wayDataProps } from "./typed";

interface wayProps {
  query?: string;
  size?: number;
  page?: number;
}

const ways = async (payload?: wayProps): Promise<wayDataProps> => {
  const { data } = await axios.get(`orders`, {
    headers: authJsonToken(),
    params: payload,
  });

  return data;
};

export const useWays = (payload?: wayProps) => {
  return useQuery({
    queryKey: ["ways"],
    queryFn: () => ways(payload),
  });
};
