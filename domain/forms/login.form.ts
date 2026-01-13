import { FormFieldSchema } from "../schemas/generic-form.schema";

export const getLoginForm = (): FormFieldSchema[] => [
  {
    name: "email",
    label: "Correo electrónico",
    placeholder: "Ingresa el correo electrónico",
    type: "email",
    required: true,
  },
  {
    name: "password",
    label: "Contraseña",
    type: "password",
    placeholder: "Ingrese la contraseña",
    required: true,
  },
];