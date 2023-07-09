import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context';
import './EducatorDashboard.css';
import EducatorDashboardDataDisplay from './EducatorDashboardDataDisplay';
import ViewDetailsIcon from '../../../assets/view-details.png';
import ArrowUp from '../../../assets/arrow-up.png';
import ArrowDown from '../../../assets/arrow-down.png';

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

  function handleNewClassroomClick() {
    navigate('/educator/new/classroom');
  }

  const classroomLinks = classrooms.map((classroom) => (
    <button
      type="button"
      className="link-blue"
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
      <div className="current-classroom-container">
        {' '}
        { currentClassroom != null ? (
          <>
            <h5 className="bold">
              Classroom
              {' '}
              {currentClassroom ? currentClassroom.classroom_name : ''}
              {' '}
              {' '}
              (
              {currentClassroom ? currentClassroom.classroom_code : ''}
              )
            </h5>
            {classroomLinks}
            <button
              type="button"
              className="link-blue"
              onClick={handleNewClassroomClick}
            >
              &#43; create new
            </button>
          </>
        ) : ''}
        <div className="flex-center">
          <div className="icon-key-container">
            <div className="icon-key">
              {' '}
              <img src={ViewDetailsIcon} alt="view details icon" className="DataDisplay-icon" />
              {' '}
              <p>view details</p>
            </div>
            <div className="icon-key">
              {' '}
              <img src={ArrowUp} alt="sort ascending icon" className="DataDisplay-icon" />
              {' '}
              <p>sort ascending</p>
            </div>
            <div className="icon-key">
              {' '}
              <img src={ArrowDown} alt="sort descending icon" className="DataDisplay-icon" />
              {' '}
              <p>sort descending</p>
            </div>
          </div>
        </div>
      </div>

      {' '}

      {currentClassroom != null ? (
        <EducatorDashboardDataDisplay
          currentClassroom={currentClassroom}
        />
      ) : (
        ''
      )}

    </div>
  );
}
