import { useForm } from "react-hook-form";
import type { AddQuestionData, AddQuestionProps } from "./AddQuestion.types";
import { useAddQuestionMutation } from "../../../../../redux/slices/sessionsApiSlice";
import { snack } from "../../../../../components/Snackbar/hooks/useSnackbarStore";
import Modal from "../../../../../components/Modal/Modal";
import Form from "../../../../../components/Form/Form";
import FormInput from "../../../../../components/Form/FormInput/FormInput";
import Button from "../../../../../components/Button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZAddQuestionData } from "./AddQuestion.schema";

const AddQuestion = ({ sessionId, onClose }: AddQuestionProps) => {
    const methods = useForm<AddQuestionData>({
        defaultValues: {
            body: "",
        },
        resolver: zodResolver(ZAddQuestionData)
    });

    const [addQuestion, { isLoading }] = useAddQuestionMutation();

    const onSubmit = async (data: AddQuestionData) => {
        try {
            await addQuestion({ sessionId, data }).unwrap();
            snack.success("Question submitted");
            onClose();
        } catch (e: any) {
            snack.error(e?.data?.error?.message || "Something went wrong");
        }
    };

    return (
        <Modal closeModal={onClose}>
            <Form methods={methods} onSubmit={onSubmit}>
                <FormInput<AddQuestionData>
                    name="body"
                    label="Question"
                />

                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Submitting..." : "Ask Question"}
                </Button>
            </Form>
        </Modal>
    );
};

export default AddQuestion;