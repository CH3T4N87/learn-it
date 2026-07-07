import type { StudentDetails } from "../../../redux/types";

export type ModalState = {
  type: "OPEN_DETAILED_VIEW",
  data: StudentDetails
} | null