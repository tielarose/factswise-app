/* eslint-disable react/jsx-tag-spacing */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EducatorDashboardDataDisplay.css';
import { format } from 'date-fns';
import ViewDetailsIcon from '../../../assets/view-details.png';
import ArrowUp from '../../../assets/arrow-up.png';
import ArrowDown from '../../../assets/arrow-down.png';

export default function EducatorDashboardDataDisplay({ currentClassroom }) {
  const navigate = useNavigate();
  const [allStudents, setAllStudents] = useState([]);

  useEffect(() => {
    if (currentClassroom.classroom_id) {
      fetch(`/api/educator/classroom-info/${currentClassroom.classroom_id}`)
        .then((response) => response.json())
        .then((data) => {
          setAllStudents(data.students);
        });
    }
  }, [currentClassroom]);

  const problemSetTypeToSymbol = {
    'Addition Subtraction': '+ -',
    'Multiplication Division': 'x &divide;',
  };

  function handleStudentNameClick(evt) {
    const studentId = evt.target.parentNode.value;
    navigate('/educator/studentdetails', { state: { studentId } });
  }

  function handleNewStudentClick() {
    navigate('/educator/new/student', {
      state: { classroom: currentClassroom },
    });
  }

  function handleSort(sortType, field, sortDirection) {
    const allStudentsCopy = [...allStudents];

    if (sortType === 'string') {
      if (sortDirection === 'ascending') {
        allStudentsCopy.sort((a, b) => a[field].localeCompare(b[field]));
        setAllStudents(allStudentsCopy);
      } else if (sortDirection === 'descending') {
        allStudentsCopy.sort((a, b) => b[field].localeCompare(a[field]));
        setAllStudents(allStudentsCopy);
      }
    } else if (sortType === 'number') {
      if (sortDirection === 'ascending') {
        allStudentsCopy.sort((a, b) => a[field] - b[field]);
        setAllStudents(allStudentsCopy);
      } else if (sortDirection === 'descending') {
        allStudentsCopy.sort((a, b) => b[field] - a[field]);
        setAllStudents(allStudentsCopy);
      }
    }
  }

  function convertDate(dateStr) {
    const monthsDict = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };

    const day = parseInt(dateStr.slice(5, 7), 10);
    const month = monthsDict[dateStr.slice(8, 11)];
    const year = parseInt(dateStr.slice(12, 17), 10);

    return new Date(year, month, day);
  }

  const studentRows = allStudents.map((student) => (
    <tr key={student.student_id}>
      <td className="icon-column">
        <button type="button" onClick={handleStudentNameClick} className="invisible-button" value={student.student_id}>
          <img src={ViewDetailsIcon} className="DataDisplay-icon" alt="view details icon"/>
        </button>
      </td>
      <td>
        {student.student_first_name}
        {' '}
        {student.student_last_name}
      </td>
      <td>{student.current_problem_set}</td>
      <td>
        {problemSetTypeToSymbol[student.latest_assessment.problem_set_type] }
        {' '}
        {student.latest_assessment.level ? student.latest_assessment.level : ''}
      </td>
      <td>
        {student.latest_assessment.date
          ? format(convertDate(student.latest_assessment.date), 'M/dd/yy')
          : ''}
      </td>
      <td>
        {student.latest_assessment.percent_as_int
          ? `${student.latest_assessment.percent_as_int}%`
          : ''}
      </td>
      <td>{ student.latest_assessment.avg_time ? student.latest_assessment.avg_time : ''}</td>
    </tr>
  ));

  return (
    <div className="DataDisplay">
      <table>
        <colgroup span="3" />
        <colgroup span="4" />
        <tbody>
          <tr>
            <th colSpan="3" scope="colgroup">Student Info</th>
            <th colSpan="4" scope="colgroup">Last Assessment</th>
          </tr>
          <tr>
            <th colSpan="2">
              <div className="flex-center">
                <p>Name</p>
                <div className="flex-column">
                  <button type="button" className="invisible-button" onClick={() => handleSort('string', 'student_first_name', 'ascending')}>
                    <img src={ArrowUp} alt="sort ascending" className="DataDisplay-icon-small"/>
                  </button>
                  <button type="button" className="invisible-button" onClick={() => handleSort('string', 'student_first_name', 'descending')}>
                    <img src={ArrowDown} alt="sort descending" className="DataDisplay-icon-small"/>
                  </button>
                </div>
              </div>
            </th>
            <th className="current-goal-column">
              <div className="flex-center">
                <p>
                  Current
                  <br />
                  Goal
                </p>
                <div className="flex-column">
                  <button type="button" className="invisible-button" onClick={() => handleSort('number', 'current_problem_set', 'ascending')}>
                    <img src={ArrowUp} alt="sort ascending" className="DataDisplay-icon-small"/>
                  </button>
                  <button type="button" className="invisible-button" onClick={() => handleSort('number', 'current_problem_set', 'descending')}>
                    <img src={ArrowDown} alt="sort descending" className="DataDisplay-icon-small"/>
                  </button>
                </div>
              </div>
            </th>
            <th>Goal</th>
            <th>Date</th>
            <th>Percent</th>
            <th>Avg Time/Question</th>
          </tr>
          {studentRows}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="6">
              <button
                type="button"
                onClick={handleNewStudentClick}
                className="link-blue"
              >
                &#43; add a new student
              </button>

            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
