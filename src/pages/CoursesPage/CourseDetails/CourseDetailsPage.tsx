import { useParams } from "react-router-dom";
import { useGetCourseByIdQuery } from "../../../redux/slices/coursesApiSlice";
import Loader from "../../../components/Loader/Loader";
import Button from "../../../components/Button/Button";
import { useState } from "react";
import type { ModalState, SessionState } from "./CourseDetailsPage.types";
import AddAnnouncement from "./components/AddAnnouncement/AddAnnouncement";
import RoleGuard from "../../../hoc/RoleGuard";
import { ROLES } from "../../../types/Roles";
import AddAssignment from "./components/AddAssignment/AddAssignment";
import AssignementsPage from "./components/AssignmentsPage/AssignmentsPage";
import AddAssignmentFile from "./components/AddAssignmentFile/AddAssignementFile";
import Submissions from "./components/Submissions/Submissions";
import AddSession from "./components/AddSession/AddSession";
import { useEndSessionMutation, useStartSessionMutation } from "../../../redux/slices/sessionsApiSlice";
import { snack } from "../../../components/Snackbar/hooks/useSnackbarStore";
import AddQuestion from "./components/AddQuestion/AddQuestion";
import QuestionsPage from "./components/QuestionsPage/QuestionsPage";



const CourseDetailPage = () => {

  const [modal, setModal] = useState<ModalState>(null);

  const [sessionLoading, setSessionLoading] = useState<SessionState>({
    startingSessionId: null,
    endingSessionId: null,
  });

  const closeModal = () => setModal(null);

  const { id } = useParams();

  const { data: course, isLoading } = useGetCourseByIdQuery(id!);

  const [startSession] = useStartSessionMutation();
  const [endSession] = useEndSessionMutation();

  if (isLoading) return <Loader />;
  if (!course) return <p>Course not found.</p>;


  const handleStart = async (sessionId: string) => {

    setSessionLoading((prev) => ({
      ...prev,
      startingSessionId: sessionId,
    }));

    try {
      await startSession(sessionId).unwrap();
      snack.success("Session started");
    } catch (e: any) {
      snack.error(e?.data?.error?.message || "Something went wrong");
    } finally {
      setSessionLoading((prev) => ({
        ...prev,
        startingSessionId: null,
      }));
    }
  };

  const handleEnd = async (sessionId: string) => {
    setSessionLoading((prev) => ({
      ...prev,
      endingSessionId: sessionId,
    }));
    try {
      await endSession(sessionId).unwrap();
      snack.success("Session ended");
    } catch (e: any) {
      snack.error(e?.data?.error?.message || "Something went wrong");
    } finally {
      setSessionLoading((prev) => ({
        ...prev,
        endingSessionId: null,
      }));
    }
  };

  return (
    <div>

      {modal?.type === "ADD_ANNOUNCEMENT" && <AddAnnouncement onClose={closeModal} courseId={id!} />}
      {modal?.type === "ADD_ASSIGNMENT" && <AddAssignment onClose={closeModal} courseId={id!} />}
      {modal?.type === "VIEW_ASSIGNMENT" && <AssignementsPage onClose={closeModal} courseId={id!} />}
      {modal?.type === "ADD_ASSIGNMENT_FILE" && <AddAssignmentFile onClose={closeModal} assignmentId={modal.assignmentId} />}
      {modal?.type === "VIEW_SUBMISSIONS" && <Submissions onClose={closeModal} assignmentId={modal.assignmentId} />}
      {modal?.type === "ADD_SESSION" && <AddSession onClose={closeModal} courseId={modal.courseId} />}
      {modal?.type === "ADD_QUESTION" && <AddQuestion onClose={closeModal} sessionId={modal.sessionId} />}
      {modal?.type === "VIEW_QUESTIONS" && <QuestionsPage onClose={closeModal} sessionId={modal.sessionId} />}

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
              {new Date(session.startsAt).toLocaleString()}{" " + session.id}
            </p>
            <p>Status: {session.status}</p>
            <RoleGuard allowed={[ROLES.INSTRUCTOR]}>
              <Button
                variant="success"
                onClick={() => handleStart(session.id)}
                disabled={sessionLoading.startingSessionId === session.id}
              >
                {sessionLoading.startingSessionId === session.id
                  ? "Going Live..."
                  : "Go Live"}
              </Button>

              <Button
                variant="danger"
                onClick={() => handleEnd(session.id)}
                disabled={sessionLoading.endingSessionId === session.id}
              >
                {sessionLoading.endingSessionId === session.id
                  ? "Ending..."
                  : "End Live Stream"}
              </Button>

            </RoleGuard>


            <Button
              variant="primary"
              onClick={() => setModal({ type: "VIEW_QUESTIONS", sessionId: session.id })}
            >
              View Questions
            </Button>


            <RoleGuard allowed={[ROLES.STUDENT]}>
              <Button variant="success" onClick={() => setModal({ type: "ADD_QUESTION", sessionId: session.id })}>Ask Questions</Button>
            </RoleGuard>
          </div>
        ))
      ) : (
        <p>No sessions scheduled</p>
      )}
      <RoleGuard allowed={[ROLES.INSTRUCTOR]}>
        <Button onClick={() => setModal({ type: "ADD_SESSION", courseId: course.id })}>Schedule a session</Button>
      </RoleGuard>



      <h2>Assignments</h2>

      {course.assignments.length ? (
        course.assignments.map((assignment) => (
          <div key={assignment.id}>
            <h4>{assignment.title}{assignment.id}</h4>

            <p>
              Due Date:
              {" " + new Date(assignment.dueAt).toLocaleDateString()}
            </p>
            <RoleGuard allowed={[ROLES.STUDENT]}>
              <Button variant="success"
                onClick={() => setModal({ type: "ADD_ASSIGNMENT_FILE", assignmentId: assignment.id })}
              >Add Assignment File</Button>
            </RoleGuard>
            <RoleGuard allowed={[ROLES.INSTRUCTOR]}>
              <Button variant="secondary"
                onClick={() => setModal({ type: "VIEW_SUBMISSIONS", assignmentId: assignment.id })}
              >View Submission Files</Button>
            </RoleGuard>
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