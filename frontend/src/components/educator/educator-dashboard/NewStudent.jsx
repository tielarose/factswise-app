import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

export default function NewStudent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { classroom } = location.state;

  const [studentFirstName, setStudentFirstName] = useState('');
  const [studentLastName, setStudentLastName] = useState('');
  const [studentGradeLevel, setStudentGradeLevel] = useState(0);
  const [studentPassword, setStudentPassword] = useState('');
  const [currentProblemSet, setCurrentProblemSet] = useState(1);

  function handleSubmit(evt) {
    evt.preventDefault();

    const formInputs = {
      student_first_name: studentFirstName,
      student_last_name: studentLastName,
      student_grade_level: studentGradeLevel,
      student_password: studentPassword,
      current_problem_set: currentProblemSet,
      classroom_id: classroom.classroom_id,
      student_login_icon: 'Z',
    };

    fetch('/api/educator/new/student', {
      method: 'POST',
      body: JSON.stringify(formInputs),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          navigate('/educator/home');
        }
      });
  }

  return (
    <div className="form-container">
      <h4>Add a student to</h4>
      <h2 className="educator-dark bold">
        {classroom.classroom_name}
      </h2>
      <div>
        <form onSubmit={handleSubmit}>
          {/* First Name Field */}
          <label htmlFor="NewStudent-first-name">First Name:</label>
          <input
            type="text"
            placeholder="first name"
            value={studentFirstName}
            onChange={(evt) => setStudentFirstName(evt.target.value)}
            name="NewStudent-first-name"
            id="NewStudent-first-name"
            required
          />
          {/* Last Name Field */}
          <label htmlFor="NewStudent-last-name">Last Name:</label>
          <input
            type="text"
            placeholder="last name"
            value={studentLastName}
            onChange={(evt) => setStudentLastName(evt.target.value)}
            name="NewStudent-last-name"
            id="NewStudent-last-name"
            required
          />
          {/* Grade Level Field */}
          <label htmlFor="NewStudent-grade-level">Grade Level:</label>
          <input
            type="number"
            min={0}
            max={3}
            placeholder="grade-level"
            value={studentGradeLevel}
            onChange={(evt) => setStudentGradeLevel(evt.target.value)}
            name="NewStudent-grade-level"
            id="NewStudent-grade-level"
            required
          />
          {/* Student Password Field */}
          <label htmlFor="NewStudent-password">Password:</label>
          <input
            type="text"
            placeholder="password"
            value={studentPassword}
            onChange={(evt) => setStudentPassword(evt.target.value)}
            name="NewStudent-password"
            id="NewStudent-password"
            required
          />
          {/* Current Problem Set Field */}
          <label htmlFor="NewStudent-grade-level">Current Problem Set: </label>
          <input
            type="number"
            min={1}
            max={6}
            placeholder="problem-set"
            value={currentProblemSet}
            onChange={(evt) => setCurrentProblemSet(evt.target.value)}
            name="NewStudent-problem-set"
            id="NewStudent-problem-set"
            required
          />
          <button className="button-blue margin-top-10px" type="submit">Add Student</button>
          <Link className="link-blue margin-top-10px" to="/educator/home">cancel</Link>
        </form>
      </div>
    </div>
  );
}
