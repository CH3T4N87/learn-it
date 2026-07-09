import type z from "zod"
import type { ZAddAssignmentFile } from "./AddAssignmentFile.schema"

export interface AddAssignmentFileProps {
    onClose: () => void,
    assignmentId: string
}


export interface AssignmentUploadForm {
  file?: File;
}


export type AssignmentContent = z.input<typeof ZAddAssignmentFile>
