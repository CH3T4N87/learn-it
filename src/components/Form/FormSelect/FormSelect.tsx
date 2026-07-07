import { Controller, type FieldValues } from "react-hook-form"
import type { FormSelectProps } from "./FormSelect.types"
import FormField from "../FormFieldWrapper/FormFieldWrapper"
import Select from "../Select/Select"

const FormSelect = <T extends FieldValues>({ label, name, options, defaultOption }: FormSelectProps<T>) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) =>
        <FormField label={label} htmlFor={name} key={name} error={error?.message}>
          <Select id={name} {...field} defaultOption={defaultOption} options={options} />
        </FormField>
      }
    />
  )
}

export default FormSelect