import { useMutation } from "@tanstack/react-query";
import { axios } from "../../../common/util/axiox";
import { ActiveUser, LoginDataProp, LoginProp } from "./typed";
import { useNavigate } from "react-router";
import { useStore } from "../../client/useStore";
import { AxiosError } from "axios";
import { toast } from "sonner";

const login = async (payload: LoginProp): Promise<LoginDataProp> => {
  const { data } = await axios.post("auth/login", payload, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return data;
};

export const useLogin = () => {
  const navigate = useNavigate();
  const setAuth = useStore((state) => state.setAuth);
  return useMutation({
    mutationFn: (payload: LoginProp) => login(payload),
    onSuccess: (data) => {
      navigate("/");
      setAuth(data.data.token);
    },
    onError: (err: AxiosError) => {
      const data = (err.response?.data as { errorCode: string }).errorCode;

      if (data == "ERR_ADM001") {
        return toast.error("User does not exits.");
      }
      if (data == "ERR_PW004") {
        return toast.error("username or password wrong!");
      }
    },
  });
};

const activeUser = async (payload: ActiveUser) => {
  const { data } = await axios.post("auth/activate-user", payload, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return data;
};

export const useActiveUser = () => {
  return useMutation({
    mutationFn: (paylaod: ActiveUser) => activeUser(paylaod),
  });
};
