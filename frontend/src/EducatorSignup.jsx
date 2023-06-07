import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./EducatorSignup.css";

export default function EducatorSignup() {
  const location = useLocation();
  const [educatorFirstName, setEducatorFirstName] = useState("");
  const [educatorLastName, setEducatorLastName] = useState("");
  const [educatorDisplayName, setEducatorDisplayName] = useState("");
  const [educatorPassword, setEducatorPassword] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();

    const formInputs = {
      educator_email: location.state.inputEmail,
      educator_first_name: educatorFirstName,
      educator_last_name: educatorLastName,
      educator_display_name: educatorDisplayName,
      educator_password: educatorPassword
    };

    fetch("/api/educator/signup", {
      method: "POST",
      body: JSON.stringify(formInputs),
      headers: { "Content-Type": "application/json" }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user_id) {
          localStorage.setItem("userId", data.user_id);
          navigate("/educator/home", { state: { user_id: data.user_id } });
        } else {
          console.log("it didn't work :(");
        }
      });
  }

  return (
    <div className="EducatorSignup">
      <h2>Educators:</h2>
      <h4>Sign up for an account</h4>
      <p>
        Not an educator? <a href="/">Go back</a>
      </p>
      <p>
        Already have an account? <a href="/educator/login">Sign in</a>
      </p>
      <div>
        <form className="EducatorSignup-form" onSubmit={handleSubmit}>
          <p> Email: {location.state.inputEmail}</p>
          {/* First Name Field */}
          <label htmlFor="EducatorSignup-educator-first-name">
            First Name:
          </label>
          <input
            type="text"
            placeholder="first name"
            value={educatorFirstName}
            onChange={(evt) => setEducatorFirstName(evt.target.value)}
            name="EducatorSignup-educator-first-name"
            id="EducatorSignup-educator-first-name"
            required
          ></input>
          {/* Last Name Field */}
          <label htmlFor="EducatorSignup-educator-last-name">Last Name:</label>
          <input
            type="text"
            placeholder="last name"
            value={educatorLastName}
            onChange={(evt) => setEducatorLastName(evt.target.value)}
            name="EducatorSignup-educator-last-name"
            id="EducatorSignup-educator-last-name"
            required
          ></input>
          {/* Display Name Field */}
          <label htmlFor="EducatorSignup-educator-display-name">
            How would you like your name to appear to your students?
          </label>
          <input
            type="text"
            placeholder="display name"
            value={educatorDisplayName}
            onChange={(evt) => setEducatorDisplayName(evt.target.value)}
            name="EducatorSignup-educator-display-name"
            id="EducatorSignup-educator-display-name"
            required
          ></input>
          {/* Password Field */}
          <label htmlFor="EducatorSignup-educator-password">Password:</label>
          <input
            type="password"
            placeholder="password"
            value={educatorPassword}
            onChange={(evt) => setEducatorPassword(evt.target.value)}
            name="EducatorSignup-educator-password"
            id="EducatorSignup-educator-password"
            required
          ></input>
          <button>Sign Up</button>
        </form>
      </div>
    </div>
  );
}
