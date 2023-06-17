import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BasicInfo from "./BasicInfo";

export default function StudentDetails() {
  const location = useLocation();
  const student_id = location.state.student_id;

  function handleEdit() {
    console.log("edit button was clicked");
  }

  function handleDelete() {
    console.log("delete button was clicked");
  }

  return (
    <>
      <h2>Student Details</h2>
      <BasicInfo student_id={student_id} />
      <button onClick={handleEdit}>edit</button>
      <button onClick={handleDelete}>delete</button>
    </>
  );
}
