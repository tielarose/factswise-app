import { useState } from "react";
import { Link } from "react-router-dom";

export default function ClassroomCodeEntry(props) {
  const [enteredClassroomCode, setEnteredClassroomCode] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();

    fetch("/api/student/get-classroom-by-code", {
      method: "POST",
      body: JSON.stringify({ entered_classroom_code: enteredClassroomCode }),
      headers: { "Content-Type": "application/json" }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.classroom_found) {
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
            value={enteredClassroomCode}
            onChange={(evt) => setEnteredClassroomCode(evt.target.value)}
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
