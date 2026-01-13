import { COMMON_AREA_STATUS } from "../constants/common-area.constants";
import { FormFieldSchema } from "../schemas/generic-form.schema";

export const getCommonAreaFormFilter = (): FormFieldSchema[] => [
  {
    name: "status",
    type: "select",
    placeholder: "Estado",
    options: [
      { value: COMMON_AREA_STATUS.allowed, label: "Disponible" },
      { value: COMMON_AREA_STATUS.not_allowed, label: "No disponible" },
      { value: COMMON_AREA_STATUS.maintenance, label: "En mantenimiento" },
    ],
  },
];