import { useForm } from "react-hook-form";
import Form from "../../components/Form/Form";
import styles from "./LoginPage.module.scss";
import type { LoginData } from "./LoginPage.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZLoginData } from "./LoginPage.schema";
import FormInput from "../../components/Form/FormInput/FormInput";
import Button from "../../components/Button/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../redux/slices/authApiSlice";
import { snack } from "../../components/Snackbar/hooks/useSnackbarStore";
import { useEffect } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const defaultValues: LoginData = {
    email: "",
    password: ""
  }

  const methods = useForm<LoginData>({ defaultValues, resolver: zodResolver(ZLoginData) });

  useEffect(() => {
          const token = localStorage.getItem("token");
          if(token){
              navigate("/dashboardRedirector")
          }
      }, [])

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await loginUser(data).unwrap();
      localStorage.setItem("token", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      snack.success("Logged in successfully");
      navigate("/dashboardRedirector");
    } catch (e: any) {
      snack.error(e.data.error.message || "Something went wrong")
    }
  }
  return (
    <div className={styles.LoginPage}>
      <Form methods={methods} onSubmit={onSubmit} >
        <span className={styles.formTitle}>Login</span>
        <FormInput<LoginData>
          label="Email"
          name="email"
          placeholder="Enter your email"
        />
        <FormInput<LoginData>
          label="Password"
          name="password"
          placeholder="Enter your password"
          type="password"
        />

        <div className={styles.formBtnContainer}>
          <Button type="submit">{isLoading ? "Logging..." : "Login"}</Button>
          <Button type="button" variant="secondary" onClick={() => navigate("/")}>Cancel</Button>
        </div>
        <p className={styles.formMsg}>Not registered? <NavLink to={"/register"}>register here</NavLink></p>

      </Form>
    </div>
  )
}

export default LoginPage