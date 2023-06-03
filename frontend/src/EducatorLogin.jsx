import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EducatorLogin.css";

export default function EducatorLogin() {
  const [educatorEmail, setEducatorEmail] = useState("");
  const navigate = useNavigate();

  function handleSubmit(evt) {
    evt.preventDefault();

    fetch(`/api/educator/login/${educatorEmail}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.educator_id) {
          navigate("/educator/signup");
        } else {
          console.log("educator was found");
        }
      });
  }

  return (
    <div className="EducatorLogin">
      <h2>Educators:</h2>
      <h3>Log In or Sign Up</h3>
      <p>
        Not an educator? <a href="/">Go back</a>
      </p>
      <div>
        <form className="EducatorLogin-form" onSubmit={handleSubmit}>
          <label htmlFor="EducatorLogin-educator-email">
            Enter your email address:
          </label>
          <input
            type="email"
            placeholder="email"
            value={educatorEmail}
            onChange={(evt) => setEducatorEmail(evt.target.value)}
            name="EducatorLogin-educator-email"
            id="EducatorLogin-educator-email"
            required
          ></input>
          <button>Next</button>
        </form>
      </div>
    </div>
  );
}
