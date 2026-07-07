import { useState } from "react";
import Button from "../../../../../components/Button/Button";
import Modal from "../../../../../components/Modal/Modal";
import { useGetSubmissionsQuery } from "../../../../../redux/slices/assignmentApiSlice";
import type { SubmissionModalState, SubmissionsProps } from "./Submissions.types";
import AddGrade from "./AddGrade/AddGrade";

const Submissions = ({ onClose, assignmentId }: SubmissionsProps) => {
    const [modal, setModal] = useState<SubmissionModalState>(null);
    const closeModal = () => setModal(null);

    const { data: submissionData, isLoading } =
        useGetSubmissionsQuery(assignmentId);

    return (
        <Modal closeModal={onClose}>
            {modal?.type === "ADD_GRADE" && <AddGrade onClose={closeModal} submissionId={modal.submissionId} />}
            <div>
                <h2>Submissions</h2>

                {isLoading && <p>Loading submissions...</p>}

                {!isLoading && submissionData?.length === 0 && (
                    <p>No submissions found</p>
                )}

                {submissionData?.map((submission) => (
                    <div key={submission.id}>
                        <h3>{submission.student.name}</h3>

                        <p>Email: {submission.student.email}</p>

                        <p> Status: {submission.status}</p>

                        <p>Grade: {submission.grade ?? "Not graded"}</p>

                        <p>Feedback: {submission.feedback ?? "No feedback"}</p>

                        <h4>Files</h4>

                        {submission.files.map((file) => (
                            <div key={file.id}>
                                <p>{file.filename}</p>
                                <p> Type: {file.contentType}</p>
                            </div>
                        ))}
                        <Button onClick={() => setModal({ type: "ADD_GRADE", submissionId: submission.id })}>Grade</Button>
                    </div>
                ))}
            </div>
        </Modal>
    );
};

export default Submissions;