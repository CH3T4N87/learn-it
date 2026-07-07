import { ZRegistrationData } from "../RegistrationPage/RegistrationPage.schema";

export const ZLoginData = ZRegistrationData.pick({
    email: true, 
    password: true
})