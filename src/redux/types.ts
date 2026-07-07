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
    course: CourseData & {id: string, instructor: Partial<User> }
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


export type Assignment =   {
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
