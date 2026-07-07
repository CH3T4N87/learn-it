import { useGetMyGradesQuery } from "../../../../redux/slices/assignmentApiSlice";

const GradesPage = () => {
  const { data: grades, isLoading } = useGetMyGradesQuery();

  if (isLoading) {
    return <div>Loading grades...</div>;
  }

  return (
    <div>
      <h2>My Grades</h2>

      {grades?.length === 0 && (
        <p>No grades available</p>
      )}

      {grades?.map((grade) => (
        <div key={grade.id}>
          <h3>{grade.assignment.title}</h3>

          <p>Course: {grade.assignment.course.title}</p>

          <p>Status: {grade.status}</p>

          <p>Grade: {grade.grade ?? "Not graded"}</p>

          <p>Feedback: {grade.feedback ?? "No feedback"}</p>

          <p> Submitted At: {new Date(grade.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default GradesPage;