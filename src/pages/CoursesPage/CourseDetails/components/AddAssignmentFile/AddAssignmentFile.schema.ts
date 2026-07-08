import z from "zod";

export const ZAddAssignmentFile = z.object( {
    filename: z.string("Invalid filename").trim().nonempty("Filename is required"),
    contentType: z.string("Invalid contentType").trim().nonempty("contentType is required"),
    size: z.coerce.number()
})