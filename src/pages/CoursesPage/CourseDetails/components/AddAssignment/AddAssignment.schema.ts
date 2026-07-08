import z from "zod";

export const ZAddAssignmentData = z.object({
    title: z.string("Invalid title").trim().nonempty("Title is required"),
    description: z.string("Invalid description").trim().nonempty("Description is required"),
    dueAt: z.string("Invalid due date").trim().nonempty("Due date is required"),
})
