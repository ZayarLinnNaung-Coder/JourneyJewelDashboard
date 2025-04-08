import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../../common/util/axiox";
import { authJsonToken } from "../../../common/util/util";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface createProps {
  name: string;
  description: string;
  imageUrl: string;
  permission: {
    menuPermissions: {
      menuId: string;
      permissionTypes: string[];
    }[];
  };
}

const createRole = async (payload: createProps) => {
  const { data } = await axios.post(`admin-roles`, payload, {
    headers: authJsonToken(),
  });
  return data;
};

export const useCreateRole = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: createProps) => createRole(payload),
    onSuccess: () => {
      navigate("/role");
      queryClient.invalidateQueries({ queryKey: ["role"] });
    },
  });
};

const editRole = async (payload: createProps, id: string) => {
  const { data } = await axios.put(`admin-roles/${id}`, payload, {
    headers: authJsonToken(),
  });
  return data;
};

export const useEditRole = (id: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: createProps) => editRole(payload, id),
    onSuccess: () => {
      navigate("/role");
      queryClient.invalidateQueries({ queryKey: ["role"] });
    },
  });
};

const removeRoleData = async (id: string, newId: string) => {
  const { data } = await axios.delete(`admin-roles/${id}?newRoleId=${newId}`, {
    headers: authJsonToken(),
  });
  return data;
};

export const useRemoveRole = (id: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (newId: string) => removeRoleData(id, newId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["role"] });
      toast.success("Role Romve successfully");
      navigate("/role");
    },
  });
};
