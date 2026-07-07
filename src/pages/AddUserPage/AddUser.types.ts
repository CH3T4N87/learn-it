import type z from "zod";
import type { ZAddUserData } from "./AddUser.schema";

export type AddUserData = z.infer<typeof ZAddUserData>;