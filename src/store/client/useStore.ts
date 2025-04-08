import { create } from "zustand";
import { AuthSlice, createAuthSlice } from "./auth.slice";

export const useStore = create<AuthSlice>((...a) => ({
  ...createAuthSlice(...a),
}));
