import { axios } from "@/common/util/axiox";
import {PlaceCreateProps, PlaceUpdateProps} from "./typed";
import { authJsonToken } from "@/common/util/util";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import {toast} from "sonner";

const createPackages = async (payload: PlaceCreateProps) => {
  const { data } = await axios.post(`packages`, payload, {
    headers: authJsonToken(),
  });
  return data;
};

export const useCreatepackages = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: PlaceCreateProps) => createPackages(payload),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["get-packages"] });
      navigate("/packages");
      toast.success("Add packages successfully");
    },
  });
};

const updatepackages = async (payload: PlaceUpdateProps, id: string) => {
  const { data } = await axios.put(`packages/${id}`, payload, {
    headers: authJsonToken(),
  });
  return data;
};

export const useUpdatepackages = (id: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: PlaceUpdateProps) => updatepackages(payload, id),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["get-packages"] });
      queryClient.refetchQueries({ queryKey: ["get-packages-by-id"] });
      navigate("/packages");
      toast.success("Edit transportation successfully");
    },
  });
};
