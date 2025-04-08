import { StateCreator } from "zustand";
import cookie from "js-cookie";

export interface AuthSlice {
  token: string;
  setAuth: (token: string) => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => {
  const cookieState = cookie.get("token");

  const token = cookieState ? cookieState : "";

  return {
    token,
    setAuth: (payload) =>
      set((state) => {
        cookie.set("token", payload);
        return { ...state, token: payload };
      }),
  };
};
