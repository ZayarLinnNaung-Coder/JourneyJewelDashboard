import { axios } from "@/common/util/axiox";
import { authJsonToken } from "@/common/util/util";
import { useQuery } from "@tanstack/react-query";
import { cityProps } from "./typed";

const city = async (): Promise<cityProps> => {
  const { data } = await axios.get(
    `locations/cities?countryId=67e376d20bf4ca08203c9f26`,
    {
      headers: authJsonToken(),
    }
  );
  return data;
};

export const useCity = () => {
  return useQuery({
    queryKey: ["city"],
    queryFn: () => city(),
  });
};
