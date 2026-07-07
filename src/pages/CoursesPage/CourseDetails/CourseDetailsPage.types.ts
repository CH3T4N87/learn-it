export type CourseDetailsPageModalState = { type: "OPEN_COURSE_DETAILS" } | null;

export type ModalState = { type: "ADD_ANNOUNCEMENT" } |
{ type: "ADD_ASSIGNMENT" } |
{ type: "VIEW_ASSIGNMENT" } |
{ type: "ADD_ASSIGNMENT_FILE", assignmentId: string } |
{ type: "VIEW_SUBMISSIONS", assignmentId: string } |
    null