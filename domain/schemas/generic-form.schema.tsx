import React from "react";

interface FormFieldCommonSchema {
  name: string;
  label?: string;
  type:
    | "text"
    | "textarea"
    | "email"
    | "number"
    | "password"
    | "checkbox"
    | "switch"
    | "date"
    | "daterange"
    | "datetime"
    | "select"
    | "select_search"
    | "multiselect"
    | "multiselect_search"
    | "file"
    | "check_password";
  initialValue?: string | number | boolean;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  description?: string;
  horizontal?: boolean;
  validate?: any;
  className?: string;
}
export type FormFieldSchema =
  | (FormFieldCommonSchema & {
      type: "text" | "textarea" | "email" | "password" | "check_password" | "checkbox" | "switch";
    })
  | (FormFieldCommonSchema & {
      type: "select" | "multiselect";
      service?: string;
      clearable?: boolean;
      options?: { value: string | null; label: string }[];
    })
  | (FormFieldCommonSchema & {
      type: "select_search" | "multiselect_search";
      endpoint: string;
    })
  | (FormFieldCommonSchema & {
      type: "number";
      min?: number;
      max?: number;
      decimals?: boolean;
      prefix?: string;
      suffix?: string;
      thousandSeparator?: string;
      allowNegative?: boolean;
    })
  | (FormFieldCommonSchema & {
      type: "date";
      mode: "single" | "range";
    })
  | (FormFieldCommonSchema & {
      type: "file";
      accept?: string;
    });