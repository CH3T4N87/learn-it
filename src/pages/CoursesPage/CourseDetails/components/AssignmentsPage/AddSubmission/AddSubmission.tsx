import { useForm } from "react-hook-form";
import Modal from "../../../../../../components/Modal/Modal";
import Form from "../../../../../../components/Form/Form";
import Button from "../../../../../../components/Button/Button";
import { useCreateSubmissionMutation, useGetMyFilesQuery } from "../../../../../../redux/slices/assignmentApiSlice";
import type { AddSubmissionProps, SubmissionData } from "./AddSubmission.types";
import { snack } from "../../../../../../components/Snackbar/hooks/useSnackbarStore";
import FormSelect from "../../../../../../components/Form/FormSelect/FormSelect";
import type { Option } from "../../../../../../components/Form/FormSelect/FormSelect.types";

const AddSubmission = ({ assignmentId, onClose }: AddSubmissionProps) => {


  const defaultValues: SubmissionData = {
    fileIds: ""
  }
  const methods = useForm<SubmissionData>({ defaultValues });

  const [createSubmission, { isLoading }] = useCreateSubmissionMutation();
  const { data: files, isLoading: gettingFiles } = useGetMyFilesQuery();

  const filteredFiles = files?.filter(file => file.kind === "SUBMISSION");

  const onSubmit = async (data: SubmissionData) => {
    try {
      // const payload = {
      //   fileIds: data.fileIds
      //     .split(",")
      //     .map((id) => id.trim())
      //     .filter(Boolean),
      // };

      // console.log("Payload: ", payload);

      await createSubmission({
        assignmentId,
        data: { fileIds: [data.fileIds] },
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

        <FormSelect<SubmissionData>
          label="Select files"
          name="fileIds"
          defaultOption={gettingFiles ? "Loading files..." : "Select a file"}
          options={
            filteredFiles?.map(file => {
              return {
                label: file.filename,
                value: file.id
              } as Option
            }) || []
          }
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </Button>

      </Form>
    </Modal>
  );
};

export default AddSubmission;