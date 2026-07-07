import type { FieldValues } from "react-hook-form";
import type { BaseFieldProps } from "../Form.types";
import type { HTMLInputTypeAttribute } from "react";

export interface FormInputProps<T extends FieldValues> extends BaseFieldProps<T>{
    type?: HTMLInputTypeAttribute,
    placeholder?: string,
    disabled?: boolean
}