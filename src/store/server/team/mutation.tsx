import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "@/common/util/axiox.ts";
import { authJsonToken } from "@/common/util/util.ts";
import { addTeamProps } from "./typed";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const addTeam = async (payload: addTeamProps) => {
  console.log(payload, "payload");

  const { data } = await axios.post(`teammates`, payload, {
    headers: authJsonToken(),
  });

  return data;
};

export const useAddTeam = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: addTeamProps) => addTeam(payload),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["get-teams"] });
      navigate("/team");
      toast.success("Add member successfully");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
};

const editTeam = async (id: string, roleId: string) => {
  const { data } = await axios.put(
    `teammates/${id}`,
    { roleId },
    {
      headers: authJsonToken(),
    }
  );

  return data;
};

export const useEditTeam = (id: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (roleId: string) => editTeam(id, roleId),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["get-teams"] });
      navigate("/team");
      toast.success("Member edit successfully");
    },
  });
};

const deleteTeam = async (id: string) => {
  const { data } = await axios.delete(`teammates/${id}`, {
    headers: authJsonToken(),
  });

  return data;
};

export const useDeleteTeam = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTeam(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-teams"] });
      queryClient.refetchQueries({ queryKey: ["get-teams"] });
      toast.success("Delete member successfully");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
};