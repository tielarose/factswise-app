import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BasicInfo from './BasicInfo';
import AssessmentInfo from './AssessmentInfo';

export default function StudentDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { studentId } = location.state;

  function handleDeleteButton() {
    fetch(`/api/educator/deletestudent/${studentId}`)
      .then((response) => response.json())
      .then((data) => console.log(data));
    navigate('/educator/home');
  }

  return (
    <>
      <h2>Student Details</h2>
      <BasicInfo studentId={studentId} />
      <AssessmentInfo studentId={studentId} />
      <button type="button" onClick={handleDeleteButton}>delete this student</button>
    </>
  );
}
