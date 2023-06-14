import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function EducatorEmailEntry(props) {
  const navigate = useNavigate();

  function handleSubmit(evt) {
    evt.preventDefault();

    fetch("/api/educator/lookup-educator-id", {
      method: "POST",
      body: JSON.stringify({ email_entered: props.emailEntered }),
      headers: { "Content-Type": "application/json" }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.educator_id === null) {
          navigate("/educator/signup", {
            state: { emailEntered: props.emailEntered }
          });
        } else {
          props.setEducatorInDB(true);
          props.setEducatorId(data.educator_id);
        }
      });
  }

  return (
    <div className="EducatorLogin">
      <h2>Educators:</h2>
      <h4>Log In or Sign Up</h4>
      <p>
        Not an educator? <Link to="/">Go back</Link>
      </p>
      <div>
        <form className="EducatorLogin-form" onSubmit={handleSubmit}>
          <label htmlFor="EducatorLogin-educator-email">
            Enter your email address:
          </label>
          <input
            type="email"
            placeholder="email"
            value={props.emailEntered}
            onChange={(evt) => props.setEmailEntered(evt.target.value)}
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
