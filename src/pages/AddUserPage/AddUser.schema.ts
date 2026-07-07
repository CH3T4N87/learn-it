import z from "zod";
import { ROLES } from "../../types/Roles";

export const ZAddUserData = z.object({
  email: z.email("email is required"),
  password: z.string("password is required").trim()
    .min(8, "password should be of at least 8 chars")
    .max(30, "password shouldn't be longer than 30"),
  name: z.string("name is required").trim().min(1, "name should be of at least 2 chars"),
  role: z.enum([ROLES.ADMIN, ROLES.INSTRUCTOR, ROLES.STUDENT])
})