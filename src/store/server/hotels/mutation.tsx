import { axios } from "@/common/util/axiox";
import {PlaceCreateProps, PlaceUpdateProps} from "./typed";
import { authJsonToken } from "@/common/util/util";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import {toast} from "sonner";

const createHotel = async (payload: PlaceCreateProps) => {
  const { data } = await axios.post(`hotels`, payload, {
    headers: authJsonToken(),
  });
  return data;
};

export const useCreateHotels = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: PlaceCreateProps) => createHotel(payload),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["get-hotels"] });
      navigate("/hotels");
      toast.success("Add hotel successfully");
    },
  });
};

const updateHotel = async (payload: PlaceUpdateProps, id: string) => {
  const { data } = await axios.put(`hotels/${id}`, payload, {
    headers: authJsonToken(),
  });
  return data;
};

export const useUpdateHotel = (id: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: PlaceUpdateProps) => updateHotel(payload, id),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["get-hotels"] });
      queryClient.refetchQueries({ queryKey: ["get-hotels-by-id"] });
      navigate("/hotels");
      toast.success("Edit transportation successfully");
    },
  });
};
