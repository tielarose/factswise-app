import React from 'react';

export default function StudentNameSelection(props) {
  function handleGoBackClick() {
    props.setIsValidClassroomCode(false);
  }

  function handleStudentClick(student) {
    props.setCurrentStudent(student);
  }

  const studentNameLinks = props.allStudents.map((student) => (
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
        {props.currentClassroom.educator_display_name}
        's Class!
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
