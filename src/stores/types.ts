import { SelectGroupOption } from "@/components/ui/select-group.tsx";

export type FormsState = {
  [key: string]: FormStepState;
};

export type FormStepState = {
  [key: string]: FormDataObject;
};

export type FormDataObject = {
  [key: string]: string | Date | SelectGroupOption;
};
