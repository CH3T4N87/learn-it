import { useForm } from "react-hook-form"
import Button from "../../../../components/Button/Button"
import Modal from "../../../../components/Modal/Modal"
import Form from "../../../../components/Form/Form"
import type { AddCoursePageProps, CourseData } from "./AddCoursePage.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { ZCourseData } from "./AddCoursePage.schema"
import FormInput from "../../../../components/Form/FormInput/FormInput"
import styles from "./AddCoursesPage.module.scss"
import { useAddCourseMutation, useGetInstructorsQuery } from "../../../../redux/slices/coursesApiSlice"
import { snack } from "../../../../components/Snackbar/hooks/useSnackbarStore"
import FormSelect from "../../../../components/Form/FormSelect/FormSelect"
import type { Option } from "../../../../components/Form/FormSelect/FormSelect.types"

const AddCoursePage = ({ onClose }: AddCoursePageProps) => {
  const defaultValues: CourseData = {
    title: "",
    description: "",
    instructorId: "",
    capacity: 1,
    isElective: true
  }
  const methods = useForm<CourseData>({ defaultValues, resolver: zodResolver(ZCourseData), mode: 'all' });

  const [addCourse, { isLoading }] = useAddCourseMutation();
  const { data: instructors, isFetching, isLoading: isLoadingInstructors } = useGetInstructorsQuery();

  const isInstructorLoading = isLoadingInstructors || isFetching;

  const onSubmit = async (data: CourseData) => {
    try {
      await addCourse(data).unwrap();
      snack.success("Course added successfully");
      onClose();
    } catch (e: any) {
      snack.error(e.data.error.message || "Something went wrong");
    }
  }

  return (
    <Modal closeModal={onClose}>
      <Form methods={methods} onSubmit={onSubmit}>
        <span className={styles.formTitle}>Add Course</span>
        <FormInput<CourseData>
          label="Title"
          name="title"
          placeholder="Enter title here"
        />
        <FormInput<CourseData>
          label="Description"
          name="description"
          placeholder="Enter description here"
        />
        <FormSelect<CourseData>
          label="Instructor"
          name="instructorId"
          defaultOption={isInstructorLoading ? "Loading instructors..." : "Select an instructor"}
          options={
            instructors?.map(inst => {
              return {
                label: inst.name,
                value: inst.id
              } as Option
            }) || []
          }
        />
        <FormInput<CourseData>
          label="Capacity"
          name="capacity"
          placeholder="Enter capacity here"
          type="number"
        />
        <div className={styles.formBtnContainer}>
          <Button type="submit" disabled={ isInstructorLoading || isLoading} >{isLoading ? "Adding..." : "Add"}</Button>
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
        </div>
      </Form>
    </Modal>
  )
}

export default AddCoursePage
