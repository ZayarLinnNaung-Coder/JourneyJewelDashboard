import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../common/util/axiox";
import { authJsonToken } from "../../../common/util/util";
import { getRoleByID, roleProps } from "./typed";

export const getRole = async (): Promise<roleProps> => {
  const { data } = await axios.get(`admin-roles`, {
    headers: authJsonToken(),
  });
  return data;
};

export const useGetRole = () => {
  return useQuery({
    queryKey: ["role"],
    queryFn: () => getRole(),
    refetchOnMount: true,
  });
};

export const getRoleById = async (id: string): Promise<getRoleByID> => {
  const { data } = await axios.get(`admin-roles/${id}`, {
    headers: authJsonToken(),
  });
  return data;
};

export const useGetRoleById = (id: string) => {
  return useQuery({
    queryKey: ["role", id],
    queryFn: () => getRoleById(id),
  });
};
