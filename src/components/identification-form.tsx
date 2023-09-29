import { FC } from "react";
import { FormBuilder } from "@/components/form-builder/form-builder.tsx";
import { IdentificationDocument } from "@/api/identification/typings.ts";
import { Button } from "@/components/ui/button.tsx";
import { FormDataObject } from "@/stores/types.ts";

type IdentificationFormProps = {
  identificationId: string;
  stepId: string;
  document: IdentificationDocument;
  isFirst: boolean;
  isLast: boolean;
  initialValues: FormDataObject;
  onNext: (values: FormDataObject) => void;
  onPrev: (values: FormDataObject) => void;
  onSubmit: (values: FormDataObject) => void;
};

export const IdentificationForm: FC<IdentificationFormProps> = ({
  document,
  isFirst,
  isLast,
  onNext,
  onPrev,
  onSubmit,
  initialValues,
}) => {
  return (
    <>
      <h1 className="text-[1.375rem] font-bold">{document.name}</h1>
      <FormBuilder
        fields={document.fields}
        initialValues={initialValues}
        onSubmit={isLast ? onSubmit : onNext}
        submitText={isLast ? "Отправить" : "Далее"}
        controlElement={({ form }) => (
          <Button type="button" className="mt-3" variant="outline" onClick={() => onPrev(form.getValues())}>
            {!isFirst && "Назад"}
          </Button>
        )}
      />
    </>
  );
};
