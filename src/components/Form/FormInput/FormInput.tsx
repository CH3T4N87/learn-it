import { Controller, useFormContext, type FieldValues } from "react-hook-form"
import type { FormInputProps } from "./FormInput.types"
import FormField from "../FormFieldWrapper/FormFieldWrapper";
import Input from "../../../components/Input/Input";

const FormInput = <T extends FieldValues>({ label, name, disabled, placeholder, type = "text" }: FormInputProps<T>) => {
    const { control } = useFormContext<T>();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) =>
                <FormField
                    label={label}
                    error={error?.message}
                    htmlFor={name}
                >
                    <Input id={name} {...field} placeholder={placeholder} type={type} disabled={disabled} />
                </FormField>
            }
        />
    )
}

export default FormInput