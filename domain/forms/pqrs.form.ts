import { PQRS_STATUS_TEXT, PQRS_TYPE } from "../constants/pqrs.constants";
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
      { value: PQRS_TYPE.CLAIM, label: "Reclamo" },
      { value: PQRS_TYPE.COMPLAINT, label: "Queja" },
      { value: PQRS_TYPE.REQUEST, label: "Petición" },
      { value: PQRS_TYPE.SUGGESTION, label: "Sugerencia" },
    ],
  },
  {
    name: "status",
    type: "select",
    placeholder: "Estado",
    options: [
      { value: PQRS_STATUS_TEXT.CLOSED, label: "Cerrado" },
      { value: PQRS_STATUS_TEXT.OPEN, label: "Abierto" },
      { value: PQRS_STATUS_TEXT.IN_PROGRESS, label: "En progreso" },
    ],
  },
];