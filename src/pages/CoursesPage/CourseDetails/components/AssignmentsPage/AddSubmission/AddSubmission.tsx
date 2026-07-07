import { useForm } from "react-hook-form";
import Modal from "../../../../../../components/Modal/Modal";
import Form from "../../../../../../components/Form/Form";
import FormInput from "../../../../../../components/Form/FormInput/FormInput";
import Button from "../../../../../../components/Button/Button";
import { useCreateSubmissionMutation } from "../../../../../../redux/slices/assignmentApiSlice";
import type { AddSubmissionProps, SubmissionData } from "./AddSubmission.types";
import { snack } from "../../../../../../components/Snackbar/hooks/useSnackbarStore";

const AddSubmission = ({ assignmentId, onClose }: AddSubmissionProps) => {

  const defaultValues: SubmissionData = {
    fileIds: ""
  }
  const methods = useForm<SubmissionData>({ defaultValues });

  const [createSubmission, { isLoading }] =
    useCreateSubmissionMutation();

  const onSubmit = async (data: SubmissionData) => {
    try {
      const payload = {
        fileIds: data.fileIds
          .split(",")
          .map((id) => id.trim())
          .filter(Boolean),
      };

      await createSubmission({
        assignmentId,
        data: payload,
      }).unwrap();

      snack.success("Submission created successfully");
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

        <FormInput<SubmissionData>
          name="fileIds"
          label="File IDs (comma separated)"
          placeholder="file_123,file_456"
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </Button>

      </Form>
    </Modal>
  );
};

export default AddSubmission;