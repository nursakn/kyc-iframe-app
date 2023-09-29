import { FC } from "react";
import { DocumentFormFieldComposite } from "@/typings.ts";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Control } from "react-hook-form";
import { DatePicker } from "@/components/ui/date-picker.tsx";
import { SelectGroupCustom } from "@/components/ui/select-group.tsx";
import { InputMask } from "@react-input/mask";
import { Textarea } from "@/components/ui/textarea.tsx";

type FormBuilderFieldProps = {
  field: DocumentFormFieldComposite;
  control: Control;
};

export const FormBuilderField: FC<FormBuilderFieldProps> = ({ field, control }) => {
  switch (field.type) {
    case "text":
      return (
        <FormField
          control={control}
          name={field.name}
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Введите"
                  label={<FormLabel>{field.name}</FormLabel>}
                  error={error && <FormMessage>{error.message}</FormMessage>}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      );
    case "phone":
      return (
        <FormField
          control={control}
          name={field.name}
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormControl>
                <InputMask
                  mask="+7 (___) ___-__-__"
                  replacement="_"
                  component={Input}
                  placeholder="+7 (123) 456-78-90"
                  label={<FormLabel>{field.name}</FormLabel>}
                  error={error && <FormMessage>{error.message}</FormMessage>}
                  inputMode="numeric"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      );
    case "email":
      return (
        <FormField
          control={control}
          name={field.name}
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="example@mail.com"
                  label={<FormLabel>{field.name}</FormLabel>}
                  error={error && <FormMessage>{error.message}</FormMessage>}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      );
    case "text-area":
      return (
        <FormField
          control={control}
          name={field.name}
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Введите"
                  label={<FormLabel>{field.name}</FormLabel>}
                  error={error && <FormMessage>{error.message}</FormMessage>}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      );
    case "date":
      return (
        <FormField
          control={control}
          name={field.name}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormItem>
              <FormControl>
                <DatePicker
                  onChange={onChange}
                  value={value instanceof Date ? value : null}
                  placeholder="Не выбрано"
                  label={<FormLabel>{field.name}</FormLabel>}
                  error={error && <FormMessage>{error.message}</FormMessage>}
                />
              </FormControl>
            </FormItem>
          )}
        />
      );
    case "select":
      return (
        <FormField
          control={control}
          name={field.name}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormItem>
              <FormControl>
                <SelectGroupCustom
                  options={field.options}
                  onChange={onChange}
                  value={typeof value === "string" ? value : ""}
                  label={<FormLabel>{field.name}</FormLabel>}
                  error={error && <FormMessage>{error.message}</FormMessage>}
                  placeholder="Не выбрано"
                />
              </FormControl>
            </FormItem>
          )}
        />
      );
  }
};
