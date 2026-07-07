import { useForm } from "react-hook-form";
import type { AddAssignmentFileProps, AssignmentContent } from "./AddAssignmentFile.types";
import { useUploadAssignmentFileMutation } from "../../../../../redux/slices/assignementApiSlice";
import { snack } from "../../../../../components/Snackbar/hooks/useSnackbarStore";
import Modal from "../../../../../components/Modal/Modal";
import Form from "../../../../../components/Form/Form";
import FormInput from "../../../../../components/Form/FormInput/FormInput";
import Button from "../../../../../components/Button/Button";


const AddAssignmentFile = ({ assignmentId, onClose }: AddAssignmentFileProps) => {
  const methods = useForm<AssignmentContent>({
    defaultValues: {
      filename: "",
      contentType: "",
      size: 1,
    },
  });

  const [uploadAssignmentFile, { isLoading }] = useUploadAssignmentFileMutation();

  const onSubmit = async (data: AssignmentContent) => {
    try {
      await uploadAssignmentFile({ assignmentId, data: {...data, size: Number(data.size)}}).unwrap();
      snack.success("Uploaded successfully");
      onClose();
    } catch (e: any) {
      snack.error(e.data.error.message || "something went wrong");
    }
  };

  return (
    <Modal closeModal={onClose}>
      <Form methods={methods} onSubmit={onSubmit}>
        <FormInput<AssignmentContent>
          name="filename"
          label="Filename"
        />

        <FormInput<AssignmentContent>
          name="contentType"
          label="Content Type"
        />

        <FormInput<AssignmentContent>
          name="size"
          label="Size"
          type="number"
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Uploading..." : "Upload"}
        </Button>
      </Form>
    </Modal>
  );
};

export default AddAssignmentFile;