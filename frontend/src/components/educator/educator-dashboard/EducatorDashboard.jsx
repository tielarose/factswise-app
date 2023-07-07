import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context';
import './EducatorDashboard.css';
import EducatorDashboardDataDisplay from './EducatorDashboardDataDisplay';

export default function EducatorDashboard() {
  const navigate = useNavigate();
  const allContext = useContext(AppContext);
  const { currentUser } = allContext;
  const [classrooms, setClassrooms] = useState([]);
  const [currentClassroom, setCurrentClassroom] = useState(null);

  useEffect(() => {
    const educatorId = localStorage.getItem('userId');

    fetch('/api/educator/get-all-classrooms', {
      method: 'POST',
      body: JSON.stringify({ educator_id: educatorId }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.classrooms_found) {
          setClassrooms(data.classrooms);
          if (currentClassroom === null) {
            setCurrentClassroom(data.classrooms[0]);
          }
        }
      });
  }, []);

  function handleClassroomClick(classroom) {
    setCurrentClassroom(classroom);
  }

  function handleNewStudentClick() {
    navigate('/educator/new/student', {
      state: { classroom: currentClassroom },
    });
  }

  function handleNewClassroomClick() {
    navigate('/educator/new/classroom');
  }

  const classroomLinks = classrooms.map((classroom) => (
    <button
      type="button"
      onClick={() => handleClassroomClick(classroom)}
      key={classroom.classroom_id}
    >
      {classroom.classroom_name}
    </button>
  ));

  return (
    <div className="EducatorDashboard">
      <h2 className="bold">
        Welcome,
        {' '}
        {currentUser?.educator_first_name}
        {' '}
        {currentUser?.educator_last_name}
      </h2>
      {' '}
      { currentClassroom != null ? (
        <>
          <p>
            Current Classroom:
            {' '}
            {currentClassroom ? currentClassroom.classroom_name : ''}
          </p>
          <p>
            Classroom Code:
            {' '}
            {currentClassroom ? currentClassroom.classroom_code : ''}
          </p>
          <p>
            <button
              type="button"
              onClick={handleNewStudentClick}
            >
              Create a new student
            </button>
            {' '}
          </p>
        </>
      ) : ''}

      {' '}
      <p>
        <button
          type="button"
          onClick={handleNewClassroomClick}
        >
          Create a new class
        </button>
        {' '}
      </p>
      { currentClassroom != null ? (
        <>
          <p>
            Switch Classrooms:
            {' '}
            {classroomLinks}
          </p>
          {' '}
          {currentClassroom ? (
            <EducatorDashboardDataDisplay
              classroomId={currentClassroom.classroom_id}
            />
          ) : (
            ''
          )}
          {' '}
        </>
      ) : ''}

    </div>
  );
}
