import React, { useState } from "react";
import "./StudentLogin.css";

export default function StudentLogin() {
  const [studentClassroomCode, setStudentClassroomCode] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();

    fetch(`/api/student/login/${studentClassroomCode}`)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <div className="StudentLogin">
      <h2>Student Login</h2>
      <p>
        Not a student? <a href="/">Go back</a>
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
    </div>
  );
}
