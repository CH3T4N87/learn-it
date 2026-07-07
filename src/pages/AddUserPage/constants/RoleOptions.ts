import type { Option } from "../../../components/Form/FormSelect/FormSelect.types";
import { ROLES } from "../../../types/Roles";

export const RoleOptions: Option[] = [
  {
    label: "ADMIN",
    value: ROLES.ADMIN
  },
  {
    label: "STUDENT",
    value: ROLES.STUDENT
  },
  {
    label: "INSTRUCTOR",
    value: ROLES.INSTRUCTOR
  }
]