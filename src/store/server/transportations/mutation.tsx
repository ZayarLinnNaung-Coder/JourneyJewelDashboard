import { axios } from "@/common/util/axiox";
import {PlaceCreateProps, PlaceUpdateProps} from "./typed";
import { authJsonToken } from "@/common/util/util";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import {toast} from "sonner";

const createTransportation = async (payload: PlaceCreateProps) => {
  const { data } = await axios.post(`transportations`, payload, {
    headers: authJsonToken(),
  });
  return data;
};

export const useCreateTransportation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: PlaceCreateProps) => createTransportation(payload),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["get-transportations"] });
      navigate("/transportations");
      toast.success("Add transportation successfully");
    },
  });
};

const updateTransportations = async (payload: PlaceUpdateProps, id: string) => {
  console.log("On updating...")
  const { data } = await axios.put(`transportations/${id}`, payload, {
    headers: authJsonToken(),
  });
  return data;
};

export const useUpdateTransportation = (id: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: PlaceUpdateProps) => updateTransportations(payload, id),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["get-transportations"] });
      queryClient.refetchQueries({ queryKey: ["get-transportations-by-id"] });
      navigate("/transportations");
      toast.success("Edit transportation successfully");
    },
  });
};
