import { axios } from "@/common/util/axiox";
import {PlaceCreateProps, PlaceUpdateProps} from "./typed";
import { authJsonToken } from "@/common/util/util";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import {toast} from "sonner";

const createWay = async (payload: PlaceCreateProps) => {
  const { data } = await axios.post(`places`, payload, {
    headers: authJsonToken(),
  });
  return data;
};

export const useCreateWay = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: PlaceCreateProps) => createWay(payload),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["get-places"] });
      navigate("/places");
      toast.success("Add place successfully");
    },
  });
};

const updateWay = async (payload: PlaceUpdateProps, id: string) => {
  console.log("On updating...")
  const { data } = await axios.put(`places/${id}`, payload, {
    headers: authJsonToken(),
  });
  return data;
};

export const useUpdateWay = (id: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: PlaceUpdateProps) => updateWay(payload, id),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["get-places"] });
      navigate("/places");
      toast.success("Edit place successfully");
    },
  });
};
