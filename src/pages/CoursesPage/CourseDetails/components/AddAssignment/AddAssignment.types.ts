import type z from "zod"
import type { ZAddAssignmentData } from "./AddAssignment.schema"

export interface AddAssignmentProps {
    onClose: () => void,
    courseId: string
}

export type AssignmentData = z.infer<typeof ZAddAssignmentData>