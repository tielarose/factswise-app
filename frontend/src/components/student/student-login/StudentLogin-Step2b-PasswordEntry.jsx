import { useState } from "react";

export default function StudentPasswordEntry(props) {
  const [studentPasswordEntry, setStudentPasswordEntry] = useState("");

  function handleGoBackClick() {
    props.setCurrentStudent({ student_id: null });
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    fetch(`/api/student/login/${props.currentStudent.student_id}`, {
      method: "POST",
      body: JSON.stringify({ student_password: studentPasswordEntry }),
      headers: { "Content-Type": "application/json" }
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <>
      <h2>
        Welcome, {props.currentStudent.student_first_name}{" "}
        {props.currentStudent.student_last_name}!
      </h2>
      <p>
        Not you? <button onClick={handleGoBackClick}>Go back</button>
      </p>
      <div>
        <form className="StudentLogin-form" onSubmit={handleSubmit}>
          <label htmlFor="StudentLogin-student-password">
            Enter your password
          </label>
          <input
            type="password"
            placeholder="password"
            value={studentPasswordEntry}
            onChange={(evt) => setStudentPasswordEntry(evt.target.value)}
            name="StudentLogin-student-password"
            id="StudentLogin-student-password"
            required
          />
          <button>Enter</button>
        </form>
      </div>
    </>
  );
}
