import { useForm } from "react-hook-form";
import { ROLES } from "../../types/Roles";
import styles from "./AddUser.module.scss";
import type { AddUserData } from "./AddUser.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZAddUserData } from "./AddUser.schema";
import Form from "../../components/Form/Form";
import FormInput from "../../components/Form/FormInput/FormInput";
import FormSelect from "../../components/Form/FormSelect/FormSelect";
import { RoleOptions } from "./constants/RoleOptions";
import Button from "../../components/Button/Button";
import { useAddUserMutation } from "../../redux/slices/authApiSlice";
import { snack } from "../../components/Snackbar/hooks/useSnackbarStore";
const AddUserPage = () => {
  const defaultValues: AddUserData = {
    name: "",
    email: "",
    password: "",
    role: ROLES.STUDENT
  }

  const methods = useForm<AddUserData>({ defaultValues, resolver: zodResolver(ZAddUserData) });

  const [addUser, { isLoading }] = useAddUserMutation();

  const onSubmit = async (data: AddUserData) => {
    try{
      await addUser(data).unwrap();
      snack.success("User added successfully");
    }catch(e: any){
      snack.error(e.data.error.message || "Something went wrong")
    }
  }
  return (
    <div className={styles.AddUserPage}>
      <Form methods={methods} onSubmit={onSubmit}>
        <FormInput<AddUserData>
          label="Name"
          name="name"
          placeholder="Enter name here"
        />
        <FormInput<AddUserData>
          label="Email"
          name="email"
          placeholder="Enter email here"
        />
        <FormInput<AddUserData>
          label="Password"
          name="password"
          type="password"
          placeholder="Enter password here"
        />
        <FormSelect<AddUserData>
          label="Role"
          name="role"
          options={RoleOptions}
          defaultOption="Select a role"
        />

        <div className={styles.formBtnContainer}>
          <Button type="submit" variant="success" >{isLoading ? "Adding..." : "Add"}</Button>
        </div>
      </Form>
    </div>
  )
}

export default AddUserPage