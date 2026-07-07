import type { FieldValues } from "react-hook-form";
import type { BaseFieldProps } from "../Form.types";


export type Option = {
  label: string,
  value: string | number
}
export interface FormSelectProps<T extends FieldValues> extends BaseFieldProps<T>{
  options?: Option[],
  defaultOption?: string
}