import type { AddQuestionData } from "../../pages/CoursesPage/CourseDetails/components/AddQuestion/AddQuestion.types";
import type { CreateSessionData } from "../../pages/CoursesPage/CourseDetails/components/AddSession/AddSession.types";
import type { GetSessionQuestionsResponse } from "../types";
import { apiSlice } from "./apiSlice";

const sessionsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createSession: builder.mutation<any, { courseId: string, data: CreateSessionData }>({
            query: ({ courseId, data }) => ({
                url: `/courses/${courseId}/sessions`,
                method: "POST",
                body: data,
            }),
        }),
        startSession: builder.mutation<void, string>({
            query: (sessionId) => ({
                url: `/sessions/${sessionId}/start`,
                method: "POST",
            }),
            invalidatesTags: ["Course"]
        }),
        endSession: builder.mutation<void, string>({
            query: (sessionId) => ({
                url: `/sessions/${sessionId}/end`,
                method: "POST",
            }),
            invalidatesTags: ["Course"]
        }),
        addQuestion: builder.mutation<void, { sessionId: string; data: AddQuestionData }>({
            query: ({ sessionId, data }) => ({
                url: `/sessions/${sessionId}/questions`,
                method: "POST",
                body: data,
            }),
        }),
        getSessionQuestions: builder.query<GetSessionQuestionsResponse, string>({
            query: (sessionId) => ({
                url: `/sessions/${sessionId}/questions`,
                method: "GET",
            }),
            providesTags: ["Questions"]
        }),
        answerQuestion: builder.mutation<void, string>({
            query: (questionId) => ({
                url: `/questions/${questionId}/answer`,
                method: "POST",
            }),
            invalidatesTags: ["Questions"]
        }),
    })
});

export const {
    useCreateSessionMutation,
    useStartSessionMutation,
    useEndSessionMutation,
    useAddQuestionMutation,
    useGetSessionQuestionsQuery,
    useAnswerQuestionMutation
} = sessionsApiSlice;