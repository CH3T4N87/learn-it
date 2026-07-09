import { useForm } from "react-hook-form";
import type { AddAssignmentFileProps, AssignmentContent, AssignmentUploadForm } from "./AddAssignmentFile.types";
import { useConfirmFileUploadMutation, useUploadAssignmentFileMutation } from "../../../../../redux/slices/assignmentApiSlice";
import { snack } from "../../../../../components/Snackbar/hooks/useSnackbarStore";
import Modal from "../../../../../components/Modal/Modal";
import Form from "../../../../../components/Form/Form";
import Button from "../../../../../components/Button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZAddAssignmentFile } from "./AddAssignmentFile.schema";
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

            const { fileId, uploadUrl } = await uploadAssignmentFile(
                {
                    assignmentId,
                    data: {
                        filename: data.file.name,
                        contentType: data.file.type,
                        size: data.file.size
                    }
                }).unwrap();

            console.log(fileId, uploadUrl);
            
            const response = await fetch(`https://xhkrpfff-4000.inc1.devtunnels.ms/internal/upload/${fileId}`, {
                method: "PUT",
                body: data.file,
                headers: {
                    "Content-Type": data.file.type,
                },
            });

            console.log(response.status);
            console.log(response.statusText);

            if (!response.ok) {
                console.log(await response.text());
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