import { useForm } from "react-hook-form";
import type { AddAssignmentFileProps, AssignmentContent, AssignmentUploadForm } from "./AddAssignmentFile.types";
import { useConfirmFileUploadMutation, useUploadAssignmentFileMutation } from "../../../../../redux/slices/assignmentApiSlice";
import { snack } from "../../../../../components/Snackbar/hooks/useSnackbarStore";
import Modal from "../../../../../components/Modal/Modal";
import Form from "../../../../../components/Form/Form";
import Button from "../../../../../components/Button/Button";
import FormFileInput from "../../../../../components/Form/FormFileInput/FormFileInput";


const AddAssignmentFile = ({ assignmentId, onClose }: AddAssignmentFileProps) => {
    
    const methods = useForm<AssignmentUploadForm>({
        defaultValues: {
            file: undefined
        },
    });

    const [uploadAssignmentFile, { isLoading }] = useUploadAssignmentFileMutation();
    const [confirmFileUpload] = useConfirmFileUploadMutation();

    const onSubmit = async (data: AssignmentUploadForm) => {
        if (!data.file) {
            snack.error("Please select a file");
            return;
        }
        try {

            const { fileId } = await uploadAssignmentFile(
                {
                    assignmentId,
                    data: {
                        filename: data.file.name,
                        contentType: data.file.type,
                        size: data.file.size
                    }
                }).unwrap();

            const uploadUrl = `https://xhkrpfff-4000.inc1.devtunnels.ms/internal/upload/${fileId}`;
            const response = await fetch(uploadUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/pdf",
                },
                body: data.file,
            });

            if (!response.ok) {
                throw new Error("Upload failed");
            }

            await confirmFileUpload(fileId).unwrap();

            snack.success("Uploaded successfully");
            onClose();

        } catch (e: any) {
            snack.error(e?.data?.error?.message || "Something went wrong");
        }
    };

    return (
        <Modal closeModal={onClose}>
            <Form methods={methods} onSubmit={onSubmit}>
                <FormFileInput<AssignmentContent>
                    name="file"
                    label="Upload File"
                />
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Uploading..." : "Upload"}
                </Button>
            </Form>
        </Modal>
    );
};

export default AddAssignmentFile;