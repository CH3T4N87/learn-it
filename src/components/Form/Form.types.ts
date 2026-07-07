import type { PropsWithChildren } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import type { Path } from "react-hook-form"


export interface BaseFieldProps<T extends FieldValues>{
    name: Path<T>,
    label: string
}


export interface FormProps extends PropsWithChildren{
    onSubmit: (data: any) => void,
    methods: UseFormReturn<any, any, any>
    className?: string
}