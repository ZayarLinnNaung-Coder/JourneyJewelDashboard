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
      // Invalidate all place-related queries
      queryClient.invalidateQueries({ queryKey: ["get-places"] });
      queryClient.invalidateQueries({ queryKey: ["get-place-by-id"] });
      navigate("/places");
      toast.success("Add place successfully");
    },
    onError: (error) => {
      console.error("Create place error:", error);
      toast.error("Failed to add place");
    },
  });
};

const updateWay = async (payload: PlaceUpdateProps, id: string) => {
  console.log("On updating...", payload);
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
    onSuccess: (data) => {
      console.log("Update successful:", data);

      // Invalidate all related queries
      queryClient.invalidateQueries({ queryKey: ["get-places"] });
      queryClient.invalidateQueries({ queryKey: ["get-place-by-id", id] });

      // Optionally update the cache directly for immediate UI update
      queryClient.setQueryData(["get-place-by-id", id], data);

      navigate("/places");
      toast.success("Edit place successfully");
    },
    onError: (error) => {
      console.error("Update place error:", error);
      toast.error("Failed to update place");
    },
  });
};