export interface SubmissionsProps {
    onClose: () => void,
    assignmentId: string
}

export type SubmissionModalState = { type: "ADD_GRADE", submissionId: string } | null