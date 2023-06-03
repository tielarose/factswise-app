import React, { useState } from "react";
import "./EducatorLogin.css";
import EducatorLoginEmailInput from "./EducatorLoginEmailInput";
import EducatorLoginPasswordInput from "./EducatorLoginPasswordInput";

export default function EducatorLogin() {
  const [educatorEmail, setEducatorEmail] = useState("");
  const [educatorInDB, setEducatorInDB] = useState(false);

  return (
    <>
      {educatorInDB ? (
        <EducatorLoginPasswordInput
          educatorEmail={educatorEmail}
          setEducatorInDB={setEducatorInDB}
        />
      ) : (
        <EducatorLoginEmailInput
          setEducatorInDB={setEducatorInDB}
          educatorEmail={educatorEmail}
          setEducatorEmail={setEducatorEmail}
        />
      )}
    </>
  );
}
