export interface AddAssignmentProps {
    onClose: () => void,
    courseId: string
}

export interface AssignmentData {
    title: string,
    description: string,
    dueAt: string
}