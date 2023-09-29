import { IdentificationService } from "@/api/identification/identification.service.ts";
import { create } from "zustand";

type IdentificationStoreState = {
  api: IdentificationService;
  setIdentificationService: (service: IdentificationService) => void;
};

export const useIdentificationStore = create<IdentificationStoreState>()((set) => ({
  api: new IdentificationService(""),
  setIdentificationService: (service: IdentificationService) => set({ api: service }),
}));
