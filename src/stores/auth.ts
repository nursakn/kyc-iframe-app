import { create } from "zustand";

type AuthStoreState = {
  token: string | null;
  setToken: (token: string) => void;
};

export const useAuthStore = create<AuthStoreState>()((set) => ({
  token: null,
  setToken: (token) => () => set({ token }),
}));
