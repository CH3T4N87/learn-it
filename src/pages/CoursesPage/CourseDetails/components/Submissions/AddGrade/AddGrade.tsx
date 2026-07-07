import { useForm } from "react-hook-form";
import Modal from "../../../../../../components/Modal/Modal";
import Form from "../../../../../../components/Form/Form";
import FormInput from "../../../../../../components/Form/FormInput/FormInput";
import Button from "../../../../../../components/Button/Button";
import type { AddGradeProps, GradeData } from "./AddGrade.types";
import { useGradeSubmissionMutation } from "../../../../../../redux/slices/assignmentApiSlice";
import { snack } from "../../../../../../components/Snackbar/hooks/useSnackbarStore";

const AddGrade = ({ onClose, submissionId }: AddGradeProps) => {

    const methods = useForm<GradeData>({
        defaultValues: {
            grade: 0,
            feedback: "",
        },
    });

    const [gradeSubmission, { isLoading }] = useGradeSubmissionMutation();


    const onSubmit = async (data: GradeData) => {
        try {
            await gradeSubmission({
                submissionId, data: { grade: Number(data.grade), feedback: data.feedback }
            }).unwrap();

            snack.success("Grade submitted successfully");
            onClose();

        } catch (e: any) {
            snack.error(
                e?.data?.error?.message || "Something went wrong"
            );
        }
    };


    return (
        <Modal closeModal={onClose}>
            <Form methods={methods} onSubmit={onSubmit}>

                <FormInput<GradeData>
                    name="grade"
                    label="Grade"
                    type="number"
                />

                <FormInput<GradeData>
                    name="feedback"
                    label="Feedback"
                />

                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Submitting..." : "Submit Grade"}
                </Button>

            </Form>
        </Modal>
    );
};

export default AddGrade;