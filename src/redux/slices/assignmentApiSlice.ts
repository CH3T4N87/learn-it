import type { AssignmentData } from "../../pages/CoursesPage/CourseDetails/components/AddAssignment/AddAssignment.types";
import type { GradeData } from "../../pages/CoursesPage/CourseDetails/components/Submissions/AddGrade/AddGrade.types";
import type { Assignment, AssignmentFileRequest, GetMyFilesResponse, GetMyGradesResponse, GetSubmissionsResponse, UploadAssignmentFileResponse } from "../types";
import { apiSlice } from "./apiSlice";

const assignmentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAssignments: builder.query<Assignment[], string>({
            query: (courseId) => ({
                url: `courses/${courseId}/assignments`
            })
        }),
        addAssignment: builder.mutation<Assignment, { assignmentData: AssignmentData, courseId: string }>({
            query: (data) => ({
                url: `courses/${data.courseId}/assignments`,
                method: "POST",
                body: data.assignmentData
            }),
            invalidatesTags: ["Course"]
        }),
        uploadAssignmentFile: builder.mutation<UploadAssignmentFileResponse, { assignmentId: string; data: AssignmentFileRequest }>({
            query: ({ assignmentId, data }) => ({
                url: `assignments/${assignmentId}/files`,
                method: "POST",
                body: data,
            }),
        }),
        createSubmission: builder.mutation({
            query: ({ assignmentId, data }) => ({
                url: `/assignments/${assignmentId}/submissions`,
                method: "POST",
                body: data,
            }),
        }),
        getSubmissions: builder.query<GetSubmissionsResponse, string>({
            query: (assignmentId) => ({
                url: `assignments/${assignmentId}/submissions`
            })
        }),
        gradeSubmission: builder.mutation<any, { submissionId: string; data: GradeData }>({
            query: ({ submissionId, data }) => ({
                url: `/submissions/${submissionId}/grade`,
                method: "POST",
                body: data,
            }),
        }),
        getMyGrades: builder.query<GetMyGradesResponse, void>({
            query: () => ({
                url: "/me/grades",
                method: "GET",
            }),
        }),
        confirmFileUpload: builder.mutation<void, string>({
            query: (fileId) => ({
                url: `/files/${fileId}/confirm`,
                method: "POST"
            })
        }),
        getMyFiles: builder.query<GetMyFilesResponse, void>({
            query: () => ({
                url: "files/me"
            })
        })
    })
})

export const {
    useGetAssignmentsQuery,
    useAddAssignmentMutation,
    useUploadAssignmentFileMutation,
    useCreateSubmissionMutation,
    useGetSubmissionsQuery,
    useGradeSubmissionMutation,
    useGetMyGradesQuery,
    useConfirmFileUploadMutation,
    useGetMyFilesQuery
} = assignmentApiSlice;