import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../common/util/axiox";
import { authJsonToken } from "../../../common/util/util";
import { MenuProps } from "./typed";

const menu = async (): Promise<MenuProps> => {
  const { data } = await axios.get(`menu`, {
    headers: authJsonToken(),
  });

  return data;
};

export const useMenu = () => {
  return useQuery({
    queryKey: ["menu"],
    queryFn: () => menu(),
  });
};
