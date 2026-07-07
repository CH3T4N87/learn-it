import { MULTICLASS } from "../../../utility/multiClass";
import type { SelectProps } from "./Select.types";
import styles from "./Select.module.scss";

const Select = ({options, className, defaultOption, ...props}: SelectProps) => {
  return (
    <select className={MULTICLASS([styles.select, className ?? ""])} {...props}>
      <option value="" disabled>{defaultOption}</option>
      {
        options?.map(option => <option key={option.label} value={option.value}>{option.label}</option>)
      }
    </select>
  )
}

export default Select