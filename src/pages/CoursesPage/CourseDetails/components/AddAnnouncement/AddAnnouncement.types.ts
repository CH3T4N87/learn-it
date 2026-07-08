import z from "zod"
import type { ZAnnouncementData } from "./AddAnnouncement.schema"

export interface AddAnnouncementProps {
    onClose: () => void,
    courseId: string
}

export type AnnouncementData = z.infer<typeof ZAnnouncementData>
