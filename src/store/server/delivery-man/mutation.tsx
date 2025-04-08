import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../../common/util/axiox";
import { authJsonToken } from "../../../common/util/util";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface payloadProps {
  name: string;
  phoneNumber: string;
  email: string;
  address: string;
  vehicleType: string; // VehicleType
  zoneId: string;
}

const createDeli = async (payload: payloadProps) => {
  const { data } = await axios.post(`delivery-men`, payload, {
    headers: authJsonToken(),
  });

  return data;
};

export const useCreateDeli = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: payloadProps) => createDeli(payload),
    onSuccess: () => {
      navigate("/delivery-men");
      queryClient.invalidateQueries({ queryKey: ["delivery-man"] });
      queryClient.refetchQueries({ queryKey: ["delivery-man"] });
      toast.success("Delivery man created ");
    },
  });
};

const removeDeli = async (id: string) => {
  const { data } = await axios.delete(`delivery-men/${id}`, {
    headers: authJsonToken(),
  });

  return data;
};

export const useRemoveDeli = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => removeDeli(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["delivery-man"] });
      navigate("/delivery-men");
      toast.success("Delivery man created ");
    },
  });
};
