import React, { useState } from "react";
import "./EducatorLogin.css";
import EducatorEmailEntry from "./EducatorLogin-Step1-EmailEntry";
import EducatorPasswordEntry from "./EducatorLogin-Step2-PasswordEntry";

export default function EducatorLogin(props) {
  const [emailEntered, setEmailEntered] = useState("");
  const [educatorInDB, setEducatorInDB] = useState(false);
  const [educatorId, setEducatorId] = useState("");

  return (
    <>
      {!educatorInDB ? (
        <EducatorEmailEntry
          setEducatorInDB={setEducatorInDB}
          emailEntered={emailEntered}
          setEmailEntered={setEmailEntered}
          setEducatorId={setEducatorId}
        />
      ) : (
        <EducatorPasswordEntry
          emailEntered={emailEntered}
          setEmailEntered={setEmailEntered}
          educatorId={educatorId}
          setEducatorInDB={setEducatorInDB}
          setCurrentUser={props.setCurrentUser}
          setIsEducator={props.setIsEducator}
        />
      )}
    </>
  );
}
