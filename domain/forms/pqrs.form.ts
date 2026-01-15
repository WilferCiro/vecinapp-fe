import { FormFieldSchema } from "../schemas/generic-form.schema";

export const getPqrsFormFilter = (): FormFieldSchema[] => [
  {
    name: "daterange",
    placeholder: "Selecciona un rango de fechas",
    type: "date",
    mode: "range",
  },
  {
    name: "type",
    type: "select",
    placeholder: "Tipo de PQRS",
    options: [
      { value: null, label: "Todos" },
      { value: "CLAIM", label: "Reclamo" },
      { value: "COMPLAINT", label: "Queja" },
      { value: "REQUEST", label: "Petición" },
      { value: "SUGGESTION", label: "Sugerencia" },
    ],
  },
  {
    name: "status",
    type: "select",
    placeholder: "Estado",
    options: [
      { value: null, label: "Todos" },
      { value: "CLOSED", label: "Cerrado" },
      { value: "OPEN", label: "Abierto" },
      { value: "IN_PROGRESS", label: "En progreso" },
    ],
  },
];

export const getPqrsResponseForm = (
  responseInitial: string
): FormFieldSchema[] => [
  {
    name: "message",
    placeholder: "Ingresa la respuesta",
    initialValue: responseInitial,
    type: "textarea",
    required: true,
  },
];

export const getPqrsCreateForm = (
): FormFieldSchema[] => [
  {
    name: "subject",
    label: "Asunto",
    placeholder: "Ingresa el asunto",
    type: "text",
    required: true,
  },
  {
    name: "description",
    label: "Descripción",
    placeholder: "Ingresa la descripción del PQRS",
    type: "textarea",
    required: true,
  },
  {
    name: "type",
    type: "select",
    label: "Tipo de PQRS",
    placeholder: "Tipo de PQRS",
    initialValue: 'CLAIM',
    options: [
      { value: "CLAIM", label: "Reclamo" },
      { value: "COMPLAINT", label: "Queja" },
      { value: "REQUEST", label: "Petición" },
      { value: "SUGGESTION", label: "Sugerencia" },
    ],
    required: true,
  },
];