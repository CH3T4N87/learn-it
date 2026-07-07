import { useForm } from "react-hook-form"
import Modal from "../../../../../components/Modal/Modal"
import Form from "../../../../../components/Form/Form";
import FormInput from "../../../../../components/Form/FormInput/FormInput";
import Button from "../../../../../components/Button/Button";
import type { AddAssignmentProps, AssignmentData } from "./AddAssignment.types";
import { useAddAssignmentMutation } from "../../../../../redux/slices/assignmentApiSlice";
import { snack } from "../../../../../components/Snackbar/hooks/useSnackbarStore";

const AddAssignment = ({ onClose, courseId }: AddAssignmentProps) => {

    const defaultValues: AssignmentData = {
        title: "",
        description: "",
        dueAt: ""
    }

    const [addAssignment, { isLoading }] = useAddAssignmentMutation();

    const methods = useForm<AssignmentData>({ defaultValues });


    const onSubmit = async (data: AssignmentData) => {
        try{
            const formattedData = {
                ...data,
                dueAt: new Date(data.dueAt).toISOString()
            }
            await addAssignment({ assignmentData: formattedData as AssignmentData, courseId }).unwrap();
            onClose();
            snack.success("Added successfully !!");
        }catch(e: any){
            snack.error(e.data.error.message || "something went wrong !!");
        }
    };
    return (
        <Modal closeModal={onClose}>
            <div>
                <Form onSubmit={onSubmit} methods={methods}>
                    <FormInput<AssignmentData>
                        label="Title"
                        name="title"
                        placeholder="Title here..."
                    />
                    <FormInput<AssignmentData>
                        label="Description"
                        name="description"
                        placeholder="Description here..."
                    />
                    <FormInput<AssignmentData>
                        label="Due Date"
                        name="dueAt"
                        type="datetime-local"
                    />

                    <Button disabled={isLoading}>{isLoading ? "Adding..." : "Add"}</Button>
                </Form>
            </div>
        </Modal>
    )
}

export default AddAssignment