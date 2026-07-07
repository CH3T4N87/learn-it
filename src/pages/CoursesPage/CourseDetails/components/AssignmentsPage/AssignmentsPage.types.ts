export interface AssignmentsPageProps {
    onClose: () => void,
    courseId: string
}

export type AssignmentsPageModalState = { type: "ADD_SUBMISSION", assignmentId: string } | null