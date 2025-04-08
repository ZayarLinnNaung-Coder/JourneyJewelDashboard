import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { axios } from "../../../common/util/axiox";
import { authJsonToken } from "../../../common/util/util";
import { getByTeamsProps, getPayload, teamProps } from "./typed";

const getTeams = async (payload: getPayload): Promise<teamProps> => {
  const { page, size, roleId, query } = payload;
  const { data } = await axios.get(`teammates`, {
    headers: authJsonToken(),
    params: { page, size, roleId, query },
  });

  return data;
};

export const useGetTeams = (payload: getPayload) => {
  return useQuery({
    queryKey: ["get-teams", payload],
    queryFn: () => getTeams(payload),
    placeholderData: keepPreviousData,
  });
};

const getTeamById = async (id: string): Promise<getByTeamsProps> => {
  const { data } = await axios.get(`teammates/${id}`, {
    headers: authJsonToken(),
  });
  return data;
};

export const useGetTeamById = (id: string) => {
  return useQuery({
    queryKey: ["team", id],
    queryFn: () => getTeamById(id),
  });
};
