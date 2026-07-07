export interface AddGradeProps {
    onClose: () => void
    submissionId: string
}

export interface GradeData {
    grade: number,
    feedback: string
}