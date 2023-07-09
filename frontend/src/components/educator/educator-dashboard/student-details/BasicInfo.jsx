/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditIcon from '../../../../assets/edit-icon.png';
import PasswordIcon from '../../../../assets/password-icon.png';
import DeleteIcon from '../../../../assets/delete-icon.png';

export default function BasicInfo({ studentId }) {
  const navigate = useNavigate();
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

  function handleDeleteButton() {
    // eslint-disable-next-line no-alert
    if (confirm('Are you sure you want to delete this student? This action cannot be undone.')) {
      fetch(`/api/educator/deletestudent/${studentId}`)
        .then((response) => response.json())
      // eslint-disable-next-line no-console
        .then((data) => console.log(data));
      navigate('/educator/home');
    }
  }

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
    <div className="basic-info-container">
      <table>
        <tbody>
          <tr>
            <td>
              <span className="bold">First Name:</span>
              {' '}
              {currentStudent.student_first_name}
            </td>
          </tr>
          <tr>
            <td>
              <span className="bold">Last Name:</span>
              {' '}
              {currentStudent.student_last_name}
            </td>
          </tr>
          <tr>
            <td>
              <span className="bold">Grade Level:</span>
              {' '}
              {numToGradeDict[currentStudent.student_grade_level]}
            </td>
          </tr>
          <tr>
            <td>
              <span className="bold">Current Goal:</span>
              {' '}
              {currentStudent.current_problem_set}
            </td>
          </tr>
          <tr>
            <td>
              <button type="button" onClick={handleEditButton} className="invisible-button">
                <div className="with-text">
                  <img src={EditIcon} className="DataDisplay-icon-small" alt="edit student info icon" />
                  <p>edit</p>
                </div>
              </button>
              <button type="button" onClick={handleResetPasswordButton} className="invisible-button">
                <div className="with-text">
                  <img src={PasswordIcon} className="DataDisplay-icon-small" alt="edit student info icon" />
                  <p>reset password</p>
                </div>
              </button>
              <button type="button" onClick={handleDeleteButton} className="invisible-button">
                <div className="with-text delete-button">
                  <img src={DeleteIcon} className="DataDisplay-icon-small" alt="edit student info icon" />
                  <p>delete student</p>
                </div>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const editableInfo = (
    <div className="basic-info-container">
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
    </div>
  );

  return (<div>{isBeingEdited ? editableInfo : displayInfo}</div>);
}
