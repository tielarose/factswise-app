import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./App";

export default function EducatorLoginPasswordInput(props) {
  const navigate = useNavigate();
  const [educatorPassword, setEducatorPassword] = useState("");
  const value = useContext(AppContext);

  function handleSubmit(evt) {
    evt.preventDefault();

    fetch(`/api/educator/login/${props.educatorEmail}`, {
      method: "POST",
      body: JSON.stringify({
        educator_password: educatorPassword
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.is_educator) {
          localStorage.setItem("userId", data.user_info.educator_id);
          props.setCurrentUser(data.user_info);
          props.setIsEducator(data.is_educator);
          navigate("/educator/home");
        } else {
          console.log("not logged in");
        }
      });
  }

  return (
    <div className="EducatorLogin step2">
      <h2>Welcome back!</h2>
      <h4>
        {props.educatorEmail} (
        <a href="/educator/login" onClick={() => props.setEducatorInDB(false)}>
          Not you?
        </a>
        )
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
