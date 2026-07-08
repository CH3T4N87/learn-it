import z from "zod";

export const ZAnnouncementData = z.object({
    body: z.string("Invalid announcement").trim().nonempty("Announcement is required")
})