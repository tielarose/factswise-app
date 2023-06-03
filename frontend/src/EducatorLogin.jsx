import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EducatorLogin.css";

export default function EducatorLogin() {
  const [educatorEmail, setEducatorEmail] = useState("");
  const [educatorPassword, setEducatorPassword] = useState("");
  const [educatorInDB, setEducatorInDB] = useState(false);
  const navigate = useNavigate();

  function handleEmailSubmit(evt) {
    evt.preventDefault();

    fetch(`/api/educator/login/${educatorEmail}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.educator_id) {
          navigate("/educator/signup");
        } else {
          setEducatorInDB(true);
        }
      });
  }

  function handlePasswordSubmit(evt) {
    evt.preventDefault();

    console.log("a password was submitted");
  }

  console.log("line 35, educatorInDB is: ", educatorInDB);
  if (!educatorInDB) {
    return (
      <div className="EducatorLogin step1">
        <h2>Educators:</h2>
        <h3>Log In or Sign Up</h3>
        <p>
          Not an educator? <a href="/">Go back</a>
        </p>
        <div>
          <form className="EducatorLogin-form" onSubmit={handleEmailSubmit}>
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
  } else if (educatorInDB) {
    return (
      <div className="EducatorLogin step2">
        <h2>Welcome back!</h2>
        <h3>
          {educatorEmail}{" "}
          <a href="/educator/login" onClick={() => setEducatorInDB(false)}>
            (Not you?)
          </a>
        </h3>

        <div>
          <form className="EducatorLogin-form" onSubmit={handlePasswordSubmit}>
            <label htmlFor="EducatorLogin-educator-password">Password:</label>
            <input
              type="password"
              placeholder="password"
              value={educatorPassword}
              onChange={(evt) => setEducatorPassword(evt.target.value)}
              name="EducatorLogin-educator-Password"
              id="EducatorLogin-educator-password"
              required
            ></input>
            <button>Next</button>
          </form>
        </div>
      </div>
    );
  }
}
