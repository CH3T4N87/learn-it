import { v4 } from "uuid";
import Button from "../../../components/Button/Button";
import Loader from "../../../components/Loader/Loader";
import { useGetMyCoursesQuery } from "../../../redux/slices/coursesApiSlice";
import styles from "./EnrolledCourses.module.scss";
import { useNavigate } from "react-router-dom";

const EnrolledCourses = () => {
  const { data: enrolledCourses, isLoading, isFetching } = useGetMyCoursesQuery();

  const navigate = useNavigate();

  if (isFetching || isLoading) return <Loader />

  return (
    <div className={styles.EnrolledCoursesPage}>
      {
        enrolledCourses?.map(enrolledCourse =>
          <div className={styles.enrolledCard} key={v4()}>
              <span className={styles.title}>{enrolledCourse.course.title}</span>
              <span className={styles.desc}>{enrolledCourse.course.description}</span>
              <span className={styles.tutor}>{enrolledCourse.course.instructor.name}</span>
              <Button variant="primary" className={styles.viewBtn} onClick={() => navigate(`/courses/${enrolledCourse.course.id}`)} > View</Button>
          </div>
        )
      }
    </div>
  )
}

export default EnrolledCourses