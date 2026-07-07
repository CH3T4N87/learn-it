import type { StudentDetails } from "../../../../../redux/types";

export interface StudentDetailsCardProps {
  data: StudentDetails,
  onClose: () => void
}