import z from "zod";

export const ZRegistrationData = z.object({
    name: z.string("Name is required").trim().min(2, "Name should have atleast 2 chars."),
    email: z.email("Invalid email"),
    password: z.string("Password is required").trim()
    .min(8, "Password should have atleast 8 chars.")
    .max(30, "Password can not be longer than 30 chars."),
})