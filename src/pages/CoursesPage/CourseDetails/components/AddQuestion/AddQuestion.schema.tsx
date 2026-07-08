import z from "zod";

export const ZAddQuestionData = z.object({
    body: z.string("Invalid question").trim().nonempty("question is required")
})