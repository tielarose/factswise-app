import React, { useContext } from 'react';
import { AppContext } from '../../Context';

export default function StudentDashboard() {
  const allContext = useContext(AppContext);
  const { currentUser } = allContext;

  return (
    <>
      <h2>
        Welcome,
        {' '}
        {currentUser.student_first_name}
        {' '}
        {currentUser.student_last_name}
        !
      </h2>

      <p>
        You are working on Goal
        {' '}
        {currentUser.current_problem_set}
      </p>

      <p>Ready to practice?</p>

      <button type="button">Let&#39;s Begin!</button>
    </>
  );
}
