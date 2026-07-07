import { MULTICLASS } from "../../utility/multiClass";
import styles from "./Button.module.scss";
import type { ButtonProps } from "./Button.types";

const Button = ({ variant = "primary", children, className, ...props }: ButtonProps) => {
    return (
        <button className={MULTICLASS([styles.btn, styles[variant], className ?? ""])} {...props}>{children}</button>
    )
}

export default Button