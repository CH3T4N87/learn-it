import type z from "zod";
import type { ZRegistrationData } from "./RegistrationPage.schema";

export type RegistrationData = z.infer<typeof ZRegistrationData>;
