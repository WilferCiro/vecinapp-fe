"use client";

import { FormFieldSchema } from "@/domain/schemas/generic-form.schema";
import { FormType } from "@/domain/types/form.type";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InputCalendar } from "@/components/ui/input-calendar";
import { InputNumber } from "@/components/ui/input-number";
import { PasswordInput } from "@/components/ui/input-password";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";


interface IFormComponent {
  form: FormType;
  formField: FormFieldSchema;
  children: (field: any) => React.ReactNode;
}

const FormComponent = ({ form, formField, children }: IFormComponent) => {
  return (
    <FormField
      control={form.control}
      name={formField.name}
      render={({ field, fieldState }) => (
        <FormItem key={formField.name} className={cn(formField.className || "")}>
          <div className={formField.horizontal ? "flex items-center justify-between gap-x-2" : ""}>
            {formField.label && <FormLabel className="mb-2">{formField.label}</FormLabel>}
            <FormControl>{children({ ...field })}</FormControl>
          </div>
          {fieldState.error ? (
            <FormMessage>{fieldState.error.message}</FormMessage>
          ) : (
            <FormDescription>{formField.description || " "}</FormDescription>
          )}
        </FormItem>
      )}
    />
  );
};

interface IGenericForm {
  form: FormType;
  className?: string;
  fields: FormFieldSchema[];
}

const GenericForm = ({ form, fields, className }: IGenericForm) => {
  const formFieldsFormat = (fields || []).map((formField: FormFieldSchema) => {
    const fieldProps = {
      disabled: formField.disabled ?? false,
      placeholder: formField.placeholder || formField.label,
      required: formField.required || false,
    };
    switch (formField.type) {
      case "email":
      case "text":
        return (
          <FormComponent form={form} formField={formField} key={formField.name}>
            {({ ...field }) => <Input {...fieldProps} {...field} />}
          </FormComponent>
        );
      case "password":
        return (
          <FormComponent form={form} formField={formField} key={formField.name}>
            {({ ...field }) => <PasswordInput {...fieldProps} {...field} />}
          </FormComponent>
        );
      case "number":
        return (
          <FormComponent form={form} formField={formField} key={formField.name}>
            {({ ...field }) => <InputNumber {...fieldProps} {...field} />}
          </FormComponent>
        );
      case "date":
        return (
          <FormComponent form={form} formField={formField} key={formField.name}>
            {({ ...field }) => (
              <InputCalendar {...fieldProps} {...field} mode={formField.mode} />
            )}
          </FormComponent>
        );
      case "textarea":
        return (
          <FormComponent form={form} formField={formField} key={formField.name}>
            {({ ...field }) => <Textarea {...fieldProps} {...field} />}
          </FormComponent>
        );
      case "checkbox":
        return (
          <FormComponent form={form} formField={formField} key={formField.name}>
            {({ ...field }) => <Checkbox {...fieldProps} {...field} />}
          </FormComponent>
        );
      case "switch":
        return (
          <FormComponent form={form} formField={formField} key={formField.name}>
            {({ ...field }) => <Switch {...fieldProps} {...field} />}
          </FormComponent>
        );
      case "select":
        return (
          <FormComponent form={form} formField={formField} key={formField.name}>
            {({ ...field }) => (
              <Select>
                <SelectTrigger id={field.name} className="w-full">
                  <SelectValue {...field} {...fieldProps} />
                </SelectTrigger>
                <SelectContent>
                  {formField.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  )) || null}
                </SelectContent>
              </Select>
            )}
          </FormComponent>
        );
    }
  });

  return (
    <>
      <Form {...form}>
        <form className={cn("w-full", className)}>{formFieldsFormat}</form>
      </Form>
    </>
  );
};

export default GenericForm;
