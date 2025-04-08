import Axios from "axios";

export const axios = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const fetchProfile = async (token: string) => {
  const { data } = await axios.get(`profile`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
