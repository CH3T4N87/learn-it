import { Controller, useFormContext, type FieldValues } from "react-hook-form"
import type { FormFileInputProps } from "./FormFileInput.types"
import Input from "../../Input/Input"
import FormField from "../FormFieldWrapper/FormFieldWrapper"

const FormFileInput = <T extends FieldValues>({ label, name, accept }: FormFileInputProps<T>) => {
    const { control } = useFormContext<T>();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) =>
                <FormField label={label} error={error?.message} htmlFor={name}>
                    <Input id={name} type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        onChange(e.target.files?.[0]);
                    }} />
                </FormField>}
        />
    )
}

export default FormFileInput