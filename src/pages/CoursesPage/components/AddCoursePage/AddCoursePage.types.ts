import type z from "zod";
import type { ZCourseData } from "./AddCoursePage.schema";

export interface AddCoursePageProps {
  onClose: () => void;
}

export type CourseData = z.input<typeof ZCourseData>;