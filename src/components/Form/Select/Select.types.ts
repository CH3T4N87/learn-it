import type { SelectHTMLAttributes } from "react";
import type { Option } from "../FormSelect/FormSelect.types";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
  options?: Option[],
  defaultOption?: string
}