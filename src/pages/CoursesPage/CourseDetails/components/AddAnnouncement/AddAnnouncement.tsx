import { useForm } from "react-hook-form"
import Modal from "../../../../../components/Modal/Modal"
import type { AddAnnouncementProps, AnnouncementData } from "./AddAnnouncement.types"
import Form from "../../../../../components/Form/Form";
import FormInput from "../../../../../components/Form/FormInput/FormInput";
import Button from "../../../../../components/Button/Button";
import { useAddAnnouncementMutation } from "../../../../../redux/slices/coursesApiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZAnnouncementData } from "./AddAnnouncement.schema";

const AddAnnouncement = ({onClose, courseId}: AddAnnouncementProps) => {

    const methods = useForm<AnnouncementData>({defaultValues: { body: "" }, resolver: zodResolver(ZAnnouncementData)});

     const [addAnnouncement, { isLoading }] = useAddAnnouncementMutation();

  const onSubmit = async (data: AnnouncementData) => {
    try {
      await addAnnouncement({ announcement: data, courseId }).unwrap();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Modal closeModal={onClose}>
        <div>
           <Form onSubmit={onSubmit} methods={methods}>
                <FormInput<AnnouncementData>
                label="Announcement"
                name="body"
                placeholder="Be descriptive"
                />
                <Button type="submit" disabled={isLoading}>{isLoading ? "Adding..." : "Add"}</Button>
           </Form>
        </div>
    </Modal>
  )
}

export default AddAnnouncement