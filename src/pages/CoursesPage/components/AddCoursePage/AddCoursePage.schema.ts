import z from "zod"

export const ZCourseData = z.object({
  title: z.string("title is required").trim().nonempty("title is required"),
  description: z.string("description is required").trim().nonempty("description is required"),
  instructorId: z.string("instructorId is required").trim().nonempty("instructorId is required"),
  capacity: z.coerce.number<number>(),
  isElective: z.boolean()
})