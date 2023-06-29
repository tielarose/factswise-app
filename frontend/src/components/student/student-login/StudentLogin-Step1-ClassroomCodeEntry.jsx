/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ClassroomCodeEntry(
  { setIsValidClassroomCode, setAllStudents, setCurrentClassroom },
) {
  const [enteredClassroomCode, setEnteredClassroomCode] = useState('');

  function handleSubmit(evt) {
    evt.preventDefault();

    fetch('/api/student/get-classroom-by-code', {
      method: 'POST',
      body: JSON.stringify({ entered_classroom_code: enteredClassroomCode }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.classroom_found) {
          setIsValidClassroomCode(true);
          setAllStudents(data.students);
          setCurrentClassroom(data.classroom);
        }
      });
  }

  return (
    <>
      <h2 className="bold">Enter your class code</h2>
      <p>
        Not a student?
        {' '}
        <Link className="link-blue" to="/">Go back</Link>
      </p>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="class code"
            value={enteredClassroomCode}
            onChange={(evt) => setEnteredClassroomCode(evt.target.value)}
            name="StudentLogin-classroom-code"
            id="StudentLogin-classroom-code"
            required
          />
          <button className="button-yellow" type="submit">Next</button>
        </form>
      </div>
    </>
  );
}
