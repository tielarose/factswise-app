import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

export default function EducatorLoginEmailInput(props) {
  const navigate = useNavigate();

  function handleSubmit(evt) {
    evt.preventDefault();

    fetch(`/api/educator/login/${props.educatorEmail}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.educator_id) {
          navigate("/educator/signup");
        } else {
          props.setEducatorInDB(true);
        }
      });
  }

  return (
    <div className="EducatorLogin">
      <h2>Educators:</h2>
      <h4>Log In or Sign Up</h4>
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
            value={props.educatorEmail}
            onChange={(evt) => props.setEducatorEmail(evt.target.value)}
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
