import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BasicInfo from "./BasicInfo";

export default function StudentDetails() {
  const location = useLocation();
  const student_id = location.state.student_id;

  return (
    <>
      <h2>Student Details</h2>
      <BasicInfo student_id={student_id} />
    </>
  );
}
