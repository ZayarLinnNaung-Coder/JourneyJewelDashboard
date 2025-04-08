import { axios } from "@/common/util/axiox";
import { authJsonToken } from "@/common/util/util";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface createZonePayload {
  name: string;
  countryId: string;
  cities: {
    id: string;
    townshipList: string[];
  }[];
}

const createZone = async (payload: createZonePayload) => {
  const { data } = await axios.post(`zones`, payload, {
    headers: authJsonToken(),
  });
  return data;
};

export const useCreateZone = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: createZonePayload) => createZone(payload),
    onSuccess: () => {
      navigate("/zone");
      queryClient.refetchQueries({ queryKey: ["zone"] });
      toast.success("Zone created successfully");
    },
  });
};

const updateZone = async (payload: createZonePayload, id: string) => {
  const { data } = await axios.put(`zones/${id}`, payload, {
    headers: authJsonToken(),
  });
  return data;
};

export const useUpdateZone = (id: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: createZonePayload) => updateZone(payload, id),
    onSuccess: () => {
      navigate("/zone");
      queryClient.refetchQueries({ queryKey: ["zone"] });
      toast.success("Zone updated successfully");
    },
  });
};
