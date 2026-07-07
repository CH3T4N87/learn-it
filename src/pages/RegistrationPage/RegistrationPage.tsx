import { useForm } from "react-hook-form";
import Form from "../../components/Form/Form";
import styles from "./RegistrationPage.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZRegistrationData } from "./RegistrationPage.schema";
import type { RegistrationData } from "./RegistationPage.types";
import FormInput from "../../components/Form/FormInput/FormInput";
import Button from "../../components/Button/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { snack } from "../../components/Snackbar/hooks/useSnackbarStore";
import { useRegisterUserMutation } from "../../redux/slices/authApiSlice";
import { useEffect } from "react";

const RegistrationPage = () => {
    const navigate = useNavigate();

    const [registerUser, { isLoading }] = useRegisterUserMutation();

    const methods = useForm<RegistrationData>({ defaultValues: { name: "", email: "", password: "" }, resolver: zodResolver(ZRegistrationData) });

    const onSubmit = async (data: RegistrationData) => {
        try {
            await registerUser(data).unwrap();
            snack.success("Registered successfully");
            navigate("/login"); //temporary navigation
        } catch (e: any) {
            snack.error(e.data.error.message || "Something went wrong")
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboardRedirector")
        }
    }, [])

    return (
        <div className={styles.RegistrationPage}>
            <Form methods={methods} onSubmit={onSubmit}>
                <span className={styles.formTitle}>Registration</span>
                <FormInput<RegistrationData>
                    label="Name"
                    name="name"
                    placeholder="Enter your name"
                />
                <FormInput<RegistrationData>
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                />
                <FormInput<RegistrationData>
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                />

                <div className={styles.formBtnContainer}>
                    <Button type="submit" disabled={isLoading}>{isLoading ? "Registering.." : "Register"}</Button>
                    <Button variant="secondary" onClick={() => navigate("/")}>Cancel</Button>
                </div>
                <p className={styles.formMsg}>Already registered? <NavLink to={"/login"}>login here</NavLink></p>
            </Form>

        </div>

    )
}

export default RegistrationPage