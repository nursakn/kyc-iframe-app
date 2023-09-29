import { FC, useEffect, useMemo } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { DocumentFormFieldComposite, DocumentFormFieldType } from "@/typings.ts";
import { Form } from "@/components/ui/form.tsx";
import { z } from "zod";
import { Button } from "@/components/ui/button.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast.ts";
import { FormBuilderField } from "@/components/form-builder/form-builder-field.tsx";
import { phoneRegex } from "@/lib/regex.ts";
import { FormDataObject } from "@/stores/types.ts";

type FormControlElement = FC<{ form: UseFormReturn<FormDataObject> }>;

type Props = {
  fields: DocumentFormFieldComposite[];
  initialValues: FormDataObject;
  submitText: string;
  onSubmit: (data: FormDataObject) => void;
  prevText?: string;
  controlElement: FormControlElement;
};

type SchemaObject = {
  [key: string]: z.ZodTypeAny;
};

function zodSchemaBuilder(fieldName: DocumentFormFieldType | "select"): z.ZodTypeAny {
  switch (fieldName) {
    case "date":
      return z
        .date({ invalid_type_error: "Неправильный формат поля" })
        .nullable()
        .transform((value, ctx) => {
          if (!value) {
            ctx.addIssue({ code: "custom", message: "Обязательное поле" });
          }

          return value;
        });
    case "email":
      return z
        .string()
        .email("Неправильный формат почты")
        .min(1, "Обязательное поле")
        .max(255, "Слишком длинное значение");
    case "phone":
      return z.string().min(1, "Обязательное поле").regex(phoneRegex, "Неправильный формат поля");
    default:
      return z.string().min(1, "Обязательное поле").max(255, "Слишком длинное значение");
  }
}

export const FormBuilder: FC<Props> = ({ fields, initialValues, onSubmit, submitText, controlElement }) => {
  const { toast } = useToast();

  const formSchema = useMemo(() => {
    const newSchemaObject: SchemaObject = {};
    fields.forEach((field) => (newSchemaObject[field.name] = zodSchemaBuilder(field.type)));
    return z.object(newSchemaObject);
  }, [fields]);

  const defaultValues = useMemo(() => {
    if (initialValues) {
      if (Object.keys(initialValues).length > 0) {
        return initialValues;
      }
    }

    const defaultValuesObject: FormDataObject = {};
    fields.forEach((field) => (defaultValuesObject[field.name] = ""));
    return defaultValuesObject;
  }, [fields, initialValues]);

  function onError() {
    toast({ title: "Ошибка", description: "Форма заполнена неправильно!", variant: "destructive" });
  }

  return (
    <FormBuilderCompositor
      formSchema={formSchema}
      defaultValues={defaultValues}
      fields={fields}
      onSubmit={onSubmit}
      onError={onError}
      submitText={submitText}
      controlElement={controlElement}
    />
  );
};

// ----------------------------------------------------------

type FormBuilderCompositorProps = {
  formSchema: z.ZodTypeAny;
  defaultValues: FormDataObject;
  fields: DocumentFormFieldComposite[];
  onSubmit: (values: FormDataObject) => void;
  onError: () => void;
  submitText: string;
  controlElement: FormControlElement;
};

const FormBuilderCompositor = ({
  formSchema,
  defaultValues,
  fields,
  onSubmit,
  onError,
  submitText,
  controlElement,
}: FormBuilderCompositorProps) => {
  const form = useForm<FormDataObject>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    console.log("default values", defaultValues);
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const ControlComponent = useMemo(() => controlElement({ form }), [form, controlElement]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)}>
        {fields.map((field) => (
          <FormBuilderField key={field.id} field={field} control={form.control} />
        ))}
        <Button type="submit">{submitText}</Button>
        {ControlComponent}
      </form>
    </Form>
  );
};
