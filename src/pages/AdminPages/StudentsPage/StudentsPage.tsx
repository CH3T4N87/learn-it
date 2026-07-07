import { useState } from 'react';
import Button from '../../../components/Button/Button';
import Loader from '../../../components/Loader/Loader';
import { useGetStudentsQuery } from '../../../redux/slices/authApiSlice';
import styles from './StudentsPage.module.scss';
import type { ModalState } from './StudentsPage.types';
import StudentDetailsCard from './components/StudentDetailsCard/StudentDetailsCard';


const StudentsPage = () => {
  const [modal, setModal] = useState<ModalState>(null);
  const { data: students, isLoading } = useGetStudentsQuery();

  const closeModal = () => setModal(null);

  if (isLoading) return <Loader />;

  return (
    <div className={styles.StudentsPage}>
      {students?.map((student) => (
        <div key={student.id} className={styles.studentPreview}>
          <span>{student.name}</span>
          <Button onClick={() => setModal({ type: "OPEN_DETAILED_VIEW", data: student })}>
            View
          </Button>
        </div>
      ))}

      {modal?.type === "OPEN_DETAILED_VIEW" && (
        <StudentDetailsCard data={modal.data} onClose={closeModal}/>
      )}
    </div>
  );
};

export default StudentsPage;
