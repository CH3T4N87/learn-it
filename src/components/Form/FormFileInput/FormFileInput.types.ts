import type { FieldValues } from "react-hook-form";
import type { BaseFieldProps } from "../Form.types";

export interface FormFileInputProps<T extends FieldValues> extends BaseFieldProps<T>{
    accept?: string
}