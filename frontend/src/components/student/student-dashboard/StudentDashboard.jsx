import React, { useContext } from 'react';
import { AppContext } from '../../Context';

export default function StudentDashboard() {
  const allContext = useContext(AppContext);
  const { currentStudent } = allContext;

  return (
    <>
      <h2>
        Welcome,
        {' '}
        {currentStudent.student_first_name}
        {' '}
        {currentStudent.student_last_name}
        !
      </h2>

      <p>
        You are working on Goal
        {' '}
        {currentStudent.current_problem_set}
      </p>

      <p>Ready to practice?</p>

      <button type="button">Let&#39s Begin!</button>
    </>
  );
}
