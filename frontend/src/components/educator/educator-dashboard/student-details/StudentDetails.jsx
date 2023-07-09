import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BasicInfo from './BasicInfo';
import AssessmentInfo from './AssessmentInfo';
import './StudentDetails.css';

export default function StudentDetails() {
  const location = useLocation();
  const { studentId } = location.state;

  return (
    <div className="margin-top-20px">
      <h2 className="bold">Student Details</h2>
      <BasicInfo studentId={studentId} />
      <AssessmentInfo studentId={studentId} />
    </div>
  );
}
