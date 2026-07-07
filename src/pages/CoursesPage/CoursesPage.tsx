import { useState } from "react";
import Button from "../../components/Button/Button";
import styles from "./CoursesPage.module.scss";
import type { ModalState } from "./CoursesPage.types";
import AddCoursePage from "./components/AddCoursePage/AddCoursePage";
import { useGetCoursesQuery } from "../../redux/slices/coursesApiSlice";
import Loader from "../../components/Loader/Loader";
import CourseCard from "./components/CourseCard/CourseCard";
import { ROLES } from "../../types/Roles";
import RoleGuard from "../../hoc/RoleGuard";

const CoursesPage = () => {
  const [modal, setModal] = useState<ModalState>(null);
  const onClose = () => setModal(null);

  const { data: coursesData, isFetching, isLoading } = useGetCoursesQuery();

  if (isFetching || isLoading) return <Loader />;

  return (
    <div className={styles.CoursesPage}>

      {modal?.type === "ADD_COURSE" && <AddCoursePage onClose={onClose} />}

      <RoleGuard allowed={[ROLES.ADMIN]}>
        <div className={styles.coursesNav}>
          <Button onClick={() => setModal({ type: "ADD_COURSE" })}>+ Add</Button>
        </div>
      </RoleGuard>

      <div className={styles.coursesContainer}>
        {
          coursesData?.map(course =>
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              capacity={course.capacity}
              instructor={course?.instructor?.name}
              instructorId={course.instructorId}
            />)
        }
      </div>
    </div>
  )
}

export default CoursesPage