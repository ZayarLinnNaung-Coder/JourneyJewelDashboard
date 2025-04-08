import { axios } from "@/common/util/axiox";
import { WapCreateProps } from "./typed";
import { authJsonToken } from "@/common/util/util";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const createWay = async (payload: WapCreateProps) => {
  const { data } = await axios.post(`orders`, payload, {
    headers: authJsonToken(),
  });
  return data;
};

export const useCreateWay = () => {
  const queyClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: WapCreateProps) => createWay(payload),
    onSuccess: () => {
      queyClient.invalidateQueries({ queryKey: ["ways"] });
      navigate("/ways");
    },
  });
};
