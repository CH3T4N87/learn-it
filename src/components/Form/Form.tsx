import { FormProvider } from "react-hook-form";
import styles from "./Form.module.scss";
import type { FormProps } from "./Form.types";
import { MULTICLASS } from "../../utility/multiClass";

const Form = ({ methods, onSubmit, className, children }: FormProps) => {
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className={MULTICLASS([styles.form, className ?? ""])}>{children}</form>
        </FormProvider>
    )
}

export default Form