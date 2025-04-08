import { axios } from "@/common/util/axiox";
import { authJsonToken } from "@/common/util/util";
import { useQuery } from "@tanstack/react-query";
import { CountryProps } from "./typed";

const country = async (): Promise<CountryProps> => {
  const { data } = await axios.get(`locations/countries`, {
    headers: authJsonToken(),
  });
  return data;
};

export const useCountry = () => {
  return useQuery({
    queryKey: ["country"],
    queryFn: () => country(),
  });
};
