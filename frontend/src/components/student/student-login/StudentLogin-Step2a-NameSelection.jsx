/* eslint-disable react/prop-types */
import React from 'react';
import './NameSelection.css';

export default function StudentNameSelection(
  {
    setIsValidClassroomCode, setCurrentStudent, allStudents, currentClassroom,
  },
) {
  function handleGoBackClick() {
    setIsValidClassroomCode(false);
  }

  function handleStudentClick(student) {
    setCurrentStudent(student);
  }

  const studentNameLinks = allStudents
    .sort((a, b) => a.student_first_name.localeCompare(b.student_first_name))
    .map((student) => (
      <button
        key={student.student_id}
        className="student-name-button"
        type="button"
        onClick={() => handleStudentClick(student)}
      >
        {student.student_first_name}
        {' '}
        {student.student_last_name}
      </button>
    ));
  return (
    <div className="NameSelection">
      <h2 className="bold">
        Welcome to
        {' '}
        {currentClassroom.educator_display_name}
        &#39;s Class!
      </h2>
      <p>
        Not your teacher?
        {' '}
        <button className="link-blue" type="button" onClick={handleGoBackClick}>Go back</button>
      </p>
      <h4>Choose your name:</h4>
      <div className="links-container">
        {studentNameLinks}
      </div>
    </div>
  );
}
