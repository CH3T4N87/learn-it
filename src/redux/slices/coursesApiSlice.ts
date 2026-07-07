import type { CourseData } from "../../pages/CoursesPage/components/AddCoursePage/AddCoursePage.types";
import type { AnnouncementData } from "../../pages/CoursesPage/CourseDetails/components/AddAnnouncement/AddAnnouncement.types";
import type { AddAnnouncementResponse, AddCourseResponse, EnrollCourseResponse, GetCourseByIdResponse, GetCoursesResponse, GetInstructorsResponse, GetMyCoursesResponse } from "../types";
import { apiSlice } from "./apiSlice";

const coursesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query<GetCoursesResponse, void>({
      query: () => ({
        url: "courses"
      }),
      providesTags: ["Courses"]
    }),
    addCourse: builder.mutation<AddCourseResponse, CourseData>({
      query: (data) => ({
        url: "courses",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Courses"]
    }),
    getInstructors: builder.query<GetInstructorsResponse, void>({
      query: () => ({
        url: "instructors"
      })
    }),
    getMyCourses: builder.query<GetMyCoursesResponse, void>({
      query: () => ({
        url: "me/courses",
      }),
      providesTags: ["EnrollCourses"]
    }),
    enrollCourse: builder.mutation<EnrollCourseResponse, string>({
      query: (id) => ({
        url: `courses/${id}/enroll`,
        method: "POST"
      }),
      invalidatesTags: ["EnrollCourses"]
    }),
    getCourseById: builder.query<GetCourseByIdResponse, string>({
      query: (id) => ({
        url: `courses/${id}`
      }),
      providesTags: ["Course"]
    }),
    addAnnouncement: builder.mutation<AddAnnouncementResponse, {announcement: AnnouncementData, courseId: string }>({
      query: (data) => ({
        url: `courses/${data.courseId}/announcements`,
        method: "POST",
        body: data.announcement
      }),
      invalidatesTags: ["Course"]
    }),
  })
})

export const {
  useGetCoursesQuery,
  useAddCourseMutation,
  useGetInstructorsQuery,
  useGetMyCoursesQuery,
  useEnrollCourseMutation,
  useGetCourseByIdQuery,
  useAddAnnouncementMutation
} = coursesApiSlice;