import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../../common/util/axiox";
import { authJsonToken } from "../../../common/util/util";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface payloadProps {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  contractStartDate: string;
  contractEndDate: string;
}

export const merchant = async (payload: payloadProps) => {
  const { data } = await axios.post(`merchants`, payload, {
    headers: authJsonToken(),
  });
  return data;
};

export const useMerchant = () => {
  const query = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: payloadProps) => merchant(payload),
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["merchant"] });
      query.refetchQueries({ queryKey: ["merchant"] });
      navigate("/merchants");
      toast.success("merchant add successfully");
    },
    onError: (err: AxiosError) => {
      const data = (err.response?.data as { errorMessage: string })
        .errorMessage;

      toast.error(data);
    },
  });
};

export const removeMerchant = async (id: string) => {
  const { data } = await axios.delete(`merchants/${id}`, {
    headers: authJsonToken(),
  });
  return data;
};

export const useRemoveMerchant = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => removeMerchant(id),
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["merchant"] });
      toast.success("Merchant remove successfully");
    },
  });
};

export const editMerchant = async (id: string, payload: payloadProps) => {
  const { data } = await axios.put(`merchants/${id}`, payload, {
    headers: authJsonToken(),
  });
  return data;
};

export const useEditMerchant = (id: string) => {
  const query = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: payloadProps) => editMerchant(id, payload),
    onSuccess: () => {
      toast.success("Merchant edit successfully");
      query.invalidateQueries({ queryKey: ["merchant"] });
      query.refetchQueries({ queryKey: ["merchant"] });
      navigate("/merchants");
    },
  });
};
