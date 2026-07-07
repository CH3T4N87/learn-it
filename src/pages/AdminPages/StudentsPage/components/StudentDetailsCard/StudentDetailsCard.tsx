import Button from "../../../../../components/Button/Button";
import Modal from "../../../../../components/Modal/Modal";
import type { StudentDetailsCardProps } from "./StudentDetailsCard.types"
import styles from "./StudentsDetailsCard.module.scss";

const StudentDetailsCard = ({ data, onClose }: StudentDetailsCardProps) => {
  return (
    <Modal closeModal={onClose}>
          <div className={styles.studentDetailsCard}>

            <span className={styles.name}><i className="fa-regular fa-circle-user"></i>{data.name}</span>
            <span className={styles.email}><i className="fa-regular fa-envelope"></i>{data.email}</span>

            <div className={styles.enrollments}>

              {data.enrollments?.map((enrollment) => {
                const courseSubmissions = data.submissions?.filter(
                  (sub) => sub.assignment.courseId === enrollment.course.id
                );

                return (
                  <div key={enrollment.id} className={styles.enrollmentBlock}>
                    <span><i className="fa-brands fa-leanpub"></i>{enrollment.course.title}</span> 
                    
                    <div className={styles.submissionsBlock}>
                      {courseSubmissions.length > 0 ? (
                        courseSubmissions.map((submission) => (
                          <span key={submission.id} className={styles.submissionItem}>
                            {submission.assignment.title}
                          </span>
                        ))
                      ) : (
                        <span className={styles.noSubmissionItem}>No submissions yet</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <Button  onClick={onClose}>Close</Button>
          </div>
        </Modal>
  )
}

export default StudentDetailsCard