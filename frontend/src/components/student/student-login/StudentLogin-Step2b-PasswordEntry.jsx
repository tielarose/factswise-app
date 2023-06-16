import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";

export default function StudentPasswordEntry(props) {
  const navigate = useNavigate();
  const allContext = useContext(AppContext);
  const [studentPasswordEntry, setStudentPasswordEntry] = useState("");

  function handleGoBackClick() {
    props.setCurrentStudent({ student_id: null });
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    fetch("/api/student/verify-student-password", {
      method: "POST",
      body: JSON.stringify({
        student_id: props.currentStudent.student_id,
        entered_password: studentPasswordEntry
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.login_successful) {
          localStorage.setItem("userId", data.user_info.student_id);
          allContext.setIsStudent(data.is_student);
          allContext.setCurrentUser(data.user_info);
          navigate("/student/home");
        }
      });
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
