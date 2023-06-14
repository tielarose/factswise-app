import { useState } from "react";
import { Link } from "react-router-dom";

export default function ClassroomCodeEntry(props) {
  const [studentClassroomCode, setStudentClassroomCode] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();

    fetch(`/api/student/login/${studentClassroomCode}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.classroom.classroom_code !== null) {
          props.setIsValidClassroomCode(true);
          props.setAllStudents(data.students);
          props.setCurrentClassroom(data.classroom);
        }
      });
  }

  return (
    <>
      <h2>Student Login</h2>
      <p>
        Not a student? <Link to="/">Go back</Link>
      </p>
      <div>
        <form className="StudentLogin-form" onSubmit={handleSubmit}>
          <label htmlFor="StudentLogin-classroom-code">
            Enter your class code:
          </label>
          <input
            type="text"
            placeholder="class code"
            value={studentClassroomCode}
            onChange={(evt) => setStudentClassroomCode(evt.target.value)}
            name="StudentLogin-classroom-code"
            id="StudentLogin-classroom-code"
            required
          />
          <button>Next</button>
        </form>
      </div>
    </>
  );
}
