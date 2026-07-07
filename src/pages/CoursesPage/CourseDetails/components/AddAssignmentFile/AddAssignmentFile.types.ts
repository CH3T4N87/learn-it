export interface AddAssignmentFileProps {
    onClose: () => void,
    assignmentId: string
}

export interface AssignmentContent {
    filename: string,
    contentType: string,
    size: number
}

