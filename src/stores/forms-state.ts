import { create } from "zustand";
import { FormDataObject, FormsState } from "@/stores/types.ts";

type FormsStateStoreState = {
  forms: FormsState;
  getStep: (identificationId: string, stepId: string) => FormDataObject;
  saveStep: (identificationId: string, stepId: string, data: FormDataObject) => void;
};

export const useFormsStateStore = create<FormsStateStoreState>()((set, get) => ({
  forms: {},
  getStep: (identificationId, stepId) => {
    const forms = get().forms;
    return forms[identificationId] ? forms[identificationId][stepId] : {};
  },
  saveStep: (identificationId, stepId, data) =>
    set((state) => {
      if (!state.forms[identificationId]) {
        state.forms[identificationId] = { [stepId]: data };
        return state;
      }

      state.forms[identificationId][stepId] = data;
      return state;
    }),
}));
