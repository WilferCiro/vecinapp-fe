import { format } from "date-fns";
import { es } from "date-fns/locale";

export const toDateString = (date: Date): string => {
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const toDateTimeString = (date: Date): string => {
  return date.toLocaleString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const humanizeDate = (value: string | Date) => {
  return format(new Date(value), "d 'de' MMMM 'de' yyyy, HH:mm", {
    locale: es,
  });
};
