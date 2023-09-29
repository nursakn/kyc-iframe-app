import { SelectGroupOption } from "@/components/ui/select-group.tsx";

export type DocumentFormFieldType = "phone" | "email" | "text" | "text-area" | "date";

export interface DocumentFormField {
  id: number;
  type: DocumentFormFieldType;
  name: string;
}

export interface DocumentFormFieldSelect {
  id: number;
  type: "select";
  name: string;
  options: SelectGroupOption[];
}

export type DocumentFormFieldComposite = DocumentFormField | DocumentFormFieldSelect;
