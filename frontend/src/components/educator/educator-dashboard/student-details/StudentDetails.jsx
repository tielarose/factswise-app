import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BasicInfo from "./BasicInfo";
import AssessmentInfo from "./AssessmentInfo";

export default function StudentDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const student_id = location.state.student_id;

  function handleDeleteButton() {
    fetch(`/api/educator/deletestudent/${student_id}`)
      .then((response) => response.json())
      .then((data) => console.log(data));
    navigate("/educator/home");
  }

  return (
    <>
      <h2>Student Details</h2>
      <BasicInfo student_id={student_id} />
      <AssessmentInfo student_id={student_id} />
      <button onClick={handleDeleteButton}>delete this student</button>
    </>
  );
}
