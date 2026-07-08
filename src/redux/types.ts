import type { User } from "../App.types"
import type { CourseData } from "../pages/CoursesPage/components/AddCoursePage/AddCoursePage.types";

export interface LoginResponse {
    accessToken: string,
    refreshToken: string
}

export type GetMeResponse = User | null;

export interface AuthState {
    user: User | null;
}

export type GetCoursesResponse = (CourseData & { id: string, instructor: Partial<User> })[]

export type AddCourseResponse = CourseData & { instructor: Pick<User, "id" | "name"> }

export type GetInstructorsResponse = Pick<User, "id" | "name" | "email">[]

export type GetMyCoursesResponse = {
    id: string,
    course: CourseData & { id: string, instructor: Partial<User> }
}[]

export type EnrollCourseResponse = {
    "id": string,
    "courseId": string,
    "studentId": string,
}

export type RefreshSessionResponse = {
    accessToken: string;
    refreshToken: string
};


export type StudentDetails = Pick<User, "id" | "name" | "email"> &
{
    enrollments: {
        id: string
        course: Pick<CourseData, "title" | "isElective"> & { id: string }
    }[],
    submissions: {
        "id": string,
        "status": "GRADED" | "NOTGRADED",
        "grade": number,
        "feedback": string,
        "assignment": Assignment
    }[]
}

export type GetStudentsResponse = StudentDetails[]



export type GetCourseByIdResponse = CourseData & {
    id: string,
    instructor: Partial<User>,
    announcements: { id: string; body: string; courseId: string; createdAt: string }[],
    sessions: { id: string; courseId: string; startsAt: string; status: "SCHEDULED" | "ACTIVE" | "ENDED" }[],
    assignments: Assignment[]
}


export type Assignment = {
    "id": string,
    "courseId": string,
    "title": string,
    "description": string,
    "dueAt": string,
    "createdAt": string
}

export type AddAnnouncementResponse = {
    "id": string,
    "courseId": string,
    "body": string,
    "createdAt": string
}

export type UploadAssignmentFileResponse =
    {
        "fileId": string,
        "uploadUrl": string,
        "method": string
    }


export type SubmissionFile = {
    id: string;
    submissionId: string;
    uploaderId: string;
    kind: "SUBMISSION";
    key: string;
    filename: string;
    contentType: string;
    size: number;
    status: "PENDING" | "CONFIRMED";
    createdAt: string;
};


export type Submission = {
    id: string;
    assignmentId: string;
    studentId: string;
    status: "SUBMITTED" | "GRADED";
    grade: number | null;
    feedback: string | null;
    createdAt: string;
    student: Pick<User, "id" | "name" | "email">;
    files: SubmissionFile[];
};


export type GetSubmissionsResponse = Submission[];


export type GradeAssignment = {
    id: string;
    courseId: string;
    title: string;
    description: string;
    dueAt: string;
    createdAt: string;

    course: {
        id: string;
        title: string;
    };
};


export type GradeResponse = {
    id: string;
    assignmentId: string;
    studentId: string;
    status: "GRADED" | "SUBMITTED";
    grade: number | null;
    feedback: string | null;
    createdAt: string;

    assignment: GradeAssignment;
};


export type GetMyGradesResponse = GradeResponse[];



export type SessionQuestion = {
    id: string;
    sessionId: string;
    studentId: string;
    body: string;
    answered: boolean;
    createdAt: string;

    student: Pick<User, "id" | "name">;
};

export type GetSessionQuestionsResponse = SessionQuestion[];