/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context';

export default function StudentPasswordEntry({ currentStudent, setCurrentStudent }) {
  const navigate = useNavigate();
  const allContext = useContext(AppContext);
  const [studentPasswordEntry, setStudentPasswordEntry] = useState('');

  function handleGoBackClick() {
    setCurrentStudent({ student_id: null });
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    fetch('/api/student/verify-student-password', {
      method: 'POST',
      body: JSON.stringify({
        student_id: currentStudent.student_id,
        entered_password: studentPasswordEntry,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.login_successful) {
          localStorage.setItem('userId', data.user_info.student_id);
          allContext.setIsStudent(data.is_student);
          allContext.setCurrentUser(data.user_info);
          navigate('/student/home');
        }
      });
  }

  return (
    <>
      <h4>Welcome back,</h4>
      <h2 className="bold">
        {currentStudent.student_first_name}
        {' '}
        {currentStudent.student_last_name}
        !
      </h2>
      <p>
        Not you?
        <button className="link-blue" type="button" onClick={handleGoBackClick}>Go back</button>
      </p>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="StudentLogin-student-password">
            Enter your password:
          </label>
          <input
            type="password"
            placeholder="password"
            value={studentPasswordEntry}
            onChange={(evt) => setStudentPasswordEntry(evt.target.value)}
            name="StudentLogin-student-password"
            id="StudentLogin-student-password"
            required
          />

          <button className="button-yellow" type="submit">Enter</button>
        </form>
      </div>
    </>
  );
}
