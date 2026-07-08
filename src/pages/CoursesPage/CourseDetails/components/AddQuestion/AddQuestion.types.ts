import type z from "zod"
import type { ZAddQuestionData } from "./AddQuestion.schema"

export interface AddQuestionProps {
    onClose: () => void,
    sessionId: string
}

export type AddQuestionData = z.infer<typeof ZAddQuestionData>