import Modal from "../../../../../components/Modal/Modal";
import Loader from "../../../../../components/Loader/Loader";
import { useGetAssignmentsQuery } from "../../../../../redux/slices/assignementApiSlice";
import type { AssignmentsPageModalState, AssignmentsPageProps } from "./AssignmentsPage.types";
import Button from "../../../../../components/Button/Button";
import { useState } from "react";
import AddSubmission from "./AddSubmission/AddSubmission";

const AssignmentPage = ({ onClose, courseId }: AssignmentsPageProps) => {

  const [modal, setModal] = useState<AssignmentsPageModalState>(null);

  const closeModal = () => setModal(null);

  const { data, isLoading } = useGetAssignmentsQuery(courseId);

  return (
    <Modal closeModal={onClose}>
        {modal?.type === "ADD_SUBMISSION" && <AddSubmission assignmentId={modal.assignmentId} onClose={closeModal} />}
      <div>
        <h2>Assignments</h2>

        {isLoading && <Loader />}

        {!isLoading && data?.length === 0 && (
          <p>No assignments available.</p>
        )}

        {data?.map((assignment) => (
          <div key={assignment.id}>
            <h3>{assignment.title}</h3>

            <p>{assignment.description}</p>

            <p>
              <span>Due:</span>{" "}
              {new Date(assignment.dueAt).toLocaleDateString()}
            </p>

            <p>
              <span>Added at:</span>{" "}
              {new Date(assignment.createdAt).toLocaleDateString()}
            </p>
            <Button onClick={() => setModal({ type: "ADD_SUBMISSION", assignmentId: assignment.id })}>Add Submission</Button>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default AssignmentPage;