import React, { useState } from "react";

export default function EducatorLoginPasswordInput(props) {
  const [educatorPassword, setEducatorPassword] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();

    console.log("a password was submitted");
  }

  return (
    <div className="EducatorLogin step2">
      <h2>Welcome back!</h2>
      <h4>
        {props.educatorEmail}&nbsp;&nbsp;
        <a href="/educator/login" onClick={() => props.setEducatorInDB(false)}>
          (Not you?)
        </a>
      </h4>

      <div>
        <form className="EducatorLogin-form" onSubmit={handleSubmit}>
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
