import React, { useContext, useState } from "react";
import { useNavigate, redirect } from "react-router-dom";
import { AppContext } from "../../../App";

export default function EducatorPasswordEntry(props) {
  const navigate = useNavigate();
  const [enteredPassword, setEnteredPassword] = useState("");
  const value = useContext(AppContext);

  function handleSubmit(evt) {
    evt.preventDefault();

    fetch("/api/educator/verify-password", {
      method: "POST",
      body: JSON.stringify({
        educator_id: props.educatorId,
        entered_password: enteredPassword
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.login_successful) {
          localStorage.setItem("userId", data.user_info.educator_id);
          props.setCurrentUser(data.user_info);
          props.setIsEducator(data.is_educator);
          navigate("/educator/home");
        } else {
          console.log("login unsuccessful");
          setEnteredPassword("");
        }
      });
  }

  return (
    <div className="EducatorLogin step2">
      <h2>Welcome back, {props.emailEntered}!</h2>
      <h4>
        <button
          onClick={() => {
            props.setEducatorInDB(false);
            props.setEmailEntered("");
            navigate("/educator/login");
          }}
        >
          Not you?
        </button>
      </h4>

      <div>
        <form className="EducatorLogin-form" onSubmit={handleSubmit}>
          <label htmlFor="EducatorLogin-educator-password">Password:</label>
          <input
            type="password"
            placeholder="password"
            value={enteredPassword}
            onChange={(evt) => setEnteredPassword(evt.target.value)}
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
