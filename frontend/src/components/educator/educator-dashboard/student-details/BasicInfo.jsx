/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

export default function BasicInfo({ studentId }) {
  const [currentStudent, setCurrentStudent] = useState({});
  const [isBeingEdited, setIsBeingEdited] = useState(false);

  // get information on the current student from the server
  useEffect(() => {
    fetch(`/api/educator/studentinfo/${studentId}`)
      .then((response) => response.json())
      .then((data) => {
        setCurrentStudent(data.student_info);
      });
  }, []);

  // this might become a global variable at some point?
  const numToGradeDict = {
    0: 'Kindergarten',
    1: 'First Grade',
    2: 'Second Grade',
    3: 'Third Grade',
    4: 'Fourth Grade',
    5: 'Fifth Grade',
  };

  function handleEditButton() {
    setIsBeingEdited(true);
  }

  function handleFieldChange(field, newValue) {
    const newStudentInfo = { ...currentStudent };
    newStudentInfo[field] = newValue;
    setCurrentStudent(newStudentInfo);
  }

  function handleSaveButton() {
    fetch('/api/educator/updatestudent', {
      method: 'POST',
      body: JSON.stringify(currentStudent),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((data) => data.json())
      .then((response) => console.log(response));

    setIsBeingEdited(false);
  }

  function handleResetPasswordButton() {
    console.log('clicked');
  }

  const displayInfo = (
    <table>
      <tbody>
        <tr>
          <td>
            First Name:
            {' '}
            {currentStudent.student_first_name}
          </td>
        </tr>
        <tr>
          <td>
            Last Name:
            {' '}
            {currentStudent.student_last_name}
          </td>
        </tr>
        <tr>
          <td>
            Grade Level:
            {' '}
            {numToGradeDict[currentStudent.student_grade_level]}
          </td>
        </tr>
        <tr>
          <td>
            Current Goal:
            {' '}
            {currentStudent.current_problem_set}
          </td>
        </tr>
        <tr>
          <td>
            <button type="button" onClick={handleEditButton}>edit</button>
            <button type="button" onClick={handleResetPasswordButton}>change password</button>
          </td>
        </tr>
      </tbody>
    </table>
  );

  const editableInfo = (
    <table>
      <tbody>
        <tr>
          <td>
            <label htmlFor="first-name">
              First Name
              {' '}
              <input
                type="text"
                id="first-name"
                value={currentStudent.student_first_name}
                placeholder={currentStudent.student_first_name}
                onChange={(evt) => handleFieldChange('student_first_name', evt.target.value)}
              />

            </label>

          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="last-name">
              Last Name
              {' '}
              <input
                type="text"
                id="last-name"
                value={currentStudent.student_last_name}
                placeholder={currentStudent.student_last_name}
                onChange={(evt) => handleFieldChange('student_last_name', evt.target.value)}
              />

            </label>

          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="grade-level">
              Grade Level
              {' '}
              <input
                type="text"
                id="grade-level"
                value={currentStudent.student_grade_level}
                placeholder={currentStudent.student_grade_level}
                onChange={(evt) => handleFieldChange('student_grade_level', evt.target.value)}
              />

            </label>

          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="goal">
              Current Goal
              {' '}
              <input
                type="text"
                id="goal"
                value={currentStudent.current_problem_set}
                placeholder={currentStudent.current_problem_set}
                onChange={(evt) => handleFieldChange('current_problem_set', evt.target.value)}
              />

            </label>

          </td>
        </tr>
        <tr>
          <td>
            <button type="button" onClick={handleSaveButton}>save</button>
          </td>
        </tr>
      </tbody>
    </table>
  );

  return (<div>{isBeingEdited ? editableInfo : displayInfo}</div>);
}
