import type z from "zod";
import type { ZLoginData } from "./LoginPage.schema";

export type LoginData = z.infer<typeof ZLoginData>;