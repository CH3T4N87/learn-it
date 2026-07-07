import { MULTICLASS } from "../../utility/multiClass";
import styles from "./Input.module.scss";
import type { InputProps } from "./Input.types";

const Input = ({className, ...props}: InputProps) => {
  return (
    <input className={MULTICLASS([styles.input, className ?? ""])} {...props}/>
  )
}

export default Input