import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { FormFieldSchema } from "@/domain/schemas/generic-form.schema";

const getInitialValues = (fields: FormFieldSchema[]) => {
  const values = [];
  for (const field of fields) {
    const initialVal = [
      "multiselect_search",
      "multiselect",
      "daterange",
    ].includes(field.type)
      ? []
      : ["date"].includes(field.type)
      ? undefined
      : "";

    values.push([field.name, field.initialValue ?? initialVal]);
  }
  return Object.fromEntries(values);
};

const getValidations = (fields: FormFieldSchema[]) => {
  const values: { [key: string]: z.ZodTypeAny } = {};
  fields.forEach((field: FormFieldSchema) => {
    if (field.validate) {
      values[field.name] = field.validate;
      return;
    }
    let validator;

    switch (field.type) {
      case "check_password":
      case "password":
      case "text":
        validator = z.string();
        break;
      case "number":
        validator = z.number().min(field.min ?? 0, {
          message: `${field.label} debe ser mayor o igual a ${field.min}`,
        });
        if (field.min) {
          validator = validator.min(
            field.min,
            `${field.label} debe ser mayor o igual a ${field.min}`
          );
        }
        if (field.max) {
          validator = validator.max(
            field.max,
            `${field.label} debe ser menor o igual a ${field.max}`
          );
        }
        break;
      case "checkbox":
        validator = z.boolean();
        break;
      case "email":
        validator = z.email(
          `${field.label} debe ser un correo electrónico válido`
        );
        break;
      case "multiselect_search":
      case "multiselect":
        validator = z.array(z.string());
        break;
      case "date":
        validator = z.date();
        break;
      default:
        validator = z.string();
        break;
    }
    if (!field.required) {
      validator = validator.optional().nullable();
    } else {
      if (field.type === "checkbox") {
        validator = validator.refine((val) => val === true, {
          message: `${field.label} debe ser seleccionado.`,
        });
      }
    }
    values[field.name] = validator;
  });
  return z.object(values);
};

export const useCustomForm = (fields: FormFieldSchema[]) => {
  const schema = getValidations(fields);

  const form = useForm({
    defaultValues: getInitialValues(fields),
    resolver: zodResolver(schema),
    mode: "all",
  });

  return {
    form,
    initialValues: getInitialValues(fields),
  };
};
