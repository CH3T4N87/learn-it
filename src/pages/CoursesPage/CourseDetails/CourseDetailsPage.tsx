import { useParams } from "react-router-dom";
import { useGetCourseByIdQuery } from "../../../redux/slices/coursesApiSlice";
import Loader from "../../../components/Loader/Loader";
import Button from "../../../components/Button/Button";
import { useState } from "react";
import type { ModalState } from "./CourseDetailsPage.types";
import AddAnnouncement from "./components/AddAnnouncement/AddAnnouncement";
import { set } from "zod";
import RoleGuard from "../../../hoc/RoleGuard";
import { ROLES } from "../../../types/Roles";
import AddAssignment from "./components/AddAssignment/AddAssignment";
import AssignementsPage from "./components/AssignmentsPage/AssignmentsPage";
import AddAssignmentFile from "./components/AddAssignmentFile/AddAssignementFile";

const CourseDetailPage = () => {
  const [modal, setModal] = useState<ModalState>(null);
  const closeModal = () => setModal(null);

  const { id } = useParams();

  const { data: course, isLoading } = useGetCourseByIdQuery(id!);

  if (isLoading) return <Loader />;
  if (!course) return <p>Course not found.</p>;

  return (
    <div>
      {modal?.type === "ADD_ANNOUNCEMENT" && <AddAnnouncement onClose={closeModal} courseId={id!} />}
      {modal?.type === "ADD_ASSIGNMENT" && <AddAssignment onClose={closeModal} courseId={id!} />}
      {modal?.type === "VIEW_ASSIGNMENT" && <AssignementsPage onClose={closeModal} courseId={id!} />}
      {modal?.type === "ADD_ASSIGNMENT_FILE" && <AddAssignmentFile onClose={closeModal} assignmentId={modal.assignmentId} />}
      <h1>{course.title}</h1>

      <p>{course.description}</p>

      <h3>Instructor</h3>
      <p>{course.instructor?.name}</p>

      <p>Capacity: {course.capacity}</p>



      <h2>Announcements</h2>

      {course.announcements.length ? (
        course.announcements.map((announcement) => (
          <div key={announcement.id}>
            <p>{announcement.body}</p>
            <span>
              {new Date(announcement.createdAt).toLocaleDateString()}
            </span>
          </div>
        ))
      ) : (
        <p>No announcements available</p>
      )}

      <RoleGuard allowed={[ROLES.ADMIN]}><Button onClick={() => setModal({ type: "ADD_ANNOUNCEMENT" })}>Add Announcement</Button></RoleGuard>

      <h2>Sessions</h2>

      {course.sessions.length ? (
        course.sessions.map((session) => (
          <div key={session.id}>
            <p>
              {new Date(session.startsAt).toLocaleString()}
            </p>
            <p>Status: {session.status}</p>
          </div>
        ))
      ) : (
        <p>No sessions scheduled</p>
      )}



      <h2>Assignments</h2>

      {course.assignments.length ? (
        course.assignments.map((assignment) => (
          <div key={assignment.id}>
            <h4>{assignment.title}{assignment.id}</h4>

            <p>
              Due Date:
              {" " + new Date(assignment.dueAt).toLocaleDateString()}
            </p>
            <RoleGuard allowed={[ROLES.INSTRUCTOR]}><Button variant="success"
              onClick={() => setModal({ type: "ADD_ASSIGNMENT_FILE", assignmentId: assignment.id })}
            >Add Assignment File</Button></RoleGuard>
          </div>
        ))
      ) : (
        <p>No assignments available</p>
      )}

      <RoleGuard allowed={[ROLES.INSTRUCTOR]}><Button
        onClick={() => setModal({ type: "ADD_ASSIGNMENT" })}
      >Add New Assignment</Button></RoleGuard>
      <RoleGuard allowed={[ROLES.STUDENT]}><Button
        onClick={() => setModal({ type: "VIEW_ASSIGNMENT" })}
      >View Assignments</Button></RoleGuard>
    </div>
  );
};

export default CourseDetailPage;