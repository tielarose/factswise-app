/* eslint-disable react/prop-types */
import React from 'react';

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

  const studentNameLinks = allStudents.map((student) => (
    <button
      key={student.student_id}
      type="button"
      onClick={() => handleStudentClick(student)}
    >
      {student.student_first_name}
      {' '}
      {student.student_last_name}
    </button>
  ));
  return (
    <>
      <h2>
        Welcome to
        {' '}
        {currentClassroom.educator_display_name}
        &#39;s Class!
      </h2>
      <p>
        Not your teacher?
        {' '}
        <button type="button" onClick={handleGoBackClick}>Go back</button>
      </p>
      <h4>Choose your name:</h4>
      {studentNameLinks}
    </>
  );
}
