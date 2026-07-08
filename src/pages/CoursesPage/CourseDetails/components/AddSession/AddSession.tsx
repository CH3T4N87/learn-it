import { useForm } from "react-hook-form";
import Modal from "../../../../../components/Modal/Modal";
import Form from "../../../../../components/Form/Form";
import FormInput from "../../../../../components/Form/FormInput/FormInput";
import Button from "../../../../../components/Button/Button";
import { snack } from "../../../../../components/Snackbar/hooks/useSnackbarStore";
import type { AddSessionProps, CreateSessionData } from "./AddSession.types";
import { useCreateSessionMutation } from "../../../../../redux/slices/sessionsApiSlice";

const AddSession = ({ courseId, onClose }: AddSessionProps) => {
    const methods = useForm<CreateSessionData>({
        defaultValues: {
            startsAt: "",
        },
    });

    const [createSession, { isLoading }] = useCreateSessionMutation();

    const onSubmit = async (data: CreateSessionData) => {
        try {
            await createSession({ courseId, data: { startsAt: new Date(data.startsAt).toISOString() } }).unwrap();
            snack.success("Session created successfully");
            onClose();
        } catch (e: any) {
            snack.error(e?.data?.error?.message || "Something went wrong");
        }
    };

    return (
        <Modal closeModal={onClose}>
            <Form methods={methods} onSubmit={onSubmit}>
                <FormInput<CreateSessionData>
                    name="startsAt"
                    label="Starts At"
                    type="datetime-local"
                />

                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Creating..." : "Create Session"}
                </Button>
            </Form>
        </Modal>
    );
};

export default AddSession;