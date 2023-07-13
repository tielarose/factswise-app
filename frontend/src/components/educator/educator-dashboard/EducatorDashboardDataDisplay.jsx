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
import WarningIcon from '../../../assets/warning-icon.png';
import StarIcon from '../../../assets/star-icon.png';

export default function EducatorDashboardDataDisplay({ currentClassroom }) {
  const navigate = useNavigate();
  const [allStudents, setAllStudents] = useState([]);

  // console.log(allStudents)

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

  function handleStudentNameClick(evt) {
    const studentId = evt.target.parentNode.value;
    navigate('/educator/studentdetails', { state: { studentId } });
  }

  function handleNewStudentClick() {
    navigate('/educator/new/student', {
      state: { classroom: currentClassroom },
    });
  }

  function handleSort(sortType, sortDirection, field1, field2 = null) {
    const allStudentsCopy = [...allStudents];

    if (sortType === 'string') {
      if (sortDirection === 'ascending') {
        allStudentsCopy.sort((a, b) => a[field1].localeCompare(b[field1]));
        setAllStudents(allStudentsCopy);
      } else if (sortDirection === 'descending') {
        allStudentsCopy.sort((a, b) => b[field1].localeCompare(a[field1]));
        setAllStudents(allStudentsCopy);
      }
    } else if (sortType === 'number') {
      if (sortDirection === 'ascending') {
        if (field2 === null) {
          allStudentsCopy.sort((a, b) => a[field1] - b[field1]);
        } else {
          allStudentsCopy.sort((a, b) => a[field1][field2] - b[field1][field2]);
        }
        setAllStudents(allStudentsCopy);
      } else if (sortDirection === 'descending') {
        if (field2 === null) {
          allStudentsCopy.sort((a, b) => b[field1] - a[field1]);
        } else {
          allStudentsCopy.sort((a, b) => b[field1][field2] - a[field1][field2]);
        }
        setAllStudents(allStudentsCopy);
      }
    } else if (sortType === 'date') {
      if (sortDirection === 'ascending') {
        allStudentsCopy
          .sort((a, b) => {
            let dateA = a[field1][field2];
            let dateB = b[field1][field2];
            if (dateA !== null) {
              dateA = convertDate(dateA);
            }
            if (dateB !== null) {
              dateB = convertDate(dateB);
            }

            return dateA - dateB;
          });
      } else if (sortDirection === 'descending') {
        allStudentsCopy
          .sort((a, b) => {
            let dateA = a[field1][field2];
            let dateB = b[field1][field2];
            if (dateA !== null) {
              dateA = convertDate(dateA);
            }
            if (dateB !== null) {
              dateB = convertDate(dateB);
            }

            return dateB - dateA;
          });
      }
      setAllStudents(allStudentsCopy);
    }
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
        { student.latest_assessment.flag > 0 ? (
          <button type="button" className="invisible-button" >
            <img src={StarIcon} alt="star icon ready to assess in person" className="DataDisplay-icon-small"/>
          </button>
        ) : ''}
        { student.latest_assessment.flag < 0 ? (
          <button type="button" className="invisible-button" >
            <img src={WarningIcon} alt="warning icon student needs extra support" className="DataDisplay-icon-small"/>
          </button>
        ) : ''}
      </td>
      <td>
        {student.latest_assessment.date
          ? format(convertDate(student.latest_assessment.date), 'M/dd/yy')
          : ''}
      </td>
      <td>
        {problemSetTypeToSymbol[student.latest_assessment.problem_set_type] }
        {' '}
        {student.latest_assessment.level ? student.latest_assessment.level : ''}
      </td>
      <td>
        {student.latest_assessment.percent_correct_as_int
          ? `${student.latest_assessment.percent_correct_as_int}%`
          : ''}
      </td>
      <td>{ student.latest_assessment.percent_fluent_as_int ? `${student.latest_assessment.percent_fluent_as_int}%` : ''}</td>
    </tr>
  ));

  return (
    <div className="DataDisplay">
      <table>
        <colgroup span="3" />
        <colgroup span="5" />
        <tbody>
          <tr className="table-header">
            <th colSpan="3" scope="colgroup">Student Info</th>
            <th colSpan="5" scope="colgroup">Most Recent Assessment</th>
          </tr>
          <tr className="table-header">
            <th colSpan="2">
              <div className="flex-center">
                <p>Name</p>
                <div className="flex-column">
                  <button type="button" className="invisible-button" onClick={() => handleSort('string', 'ascending', 'student_first_name')}>
                    <img src={ArrowUp} alt="sort ascending" className="DataDisplay-icon-small"/>
                  </button>
                  <button type="button" className="invisible-button" onClick={() => handleSort('string', 'descending', 'student_first_name')}>
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
                  <button type="button" className="invisible-button" onClick={() => handleSort('number', 'ascending', 'current_problem_set')}>
                    <img src={ArrowUp} alt="sort ascending" className="DataDisplay-icon-small"/>
                  </button>
                  <button type="button" className="invisible-button" onClick={() => handleSort('number', 'descending', 'current_problem_set')}>
                    <img src={ArrowDown} alt="sort descending" className="DataDisplay-icon-small"/>
                  </button>
                </div>
              </div>
            </th>
            <th>
              <div className="flex-center">
                <p>Flag</p>
                <div className="flex-column">
                  <button type="button" className="invisible-button" onClick={() => handleSort('number', 'ascending', 'latest_assessment', 'flag')}>
                    <img src={ArrowUp} alt="sort ascending" className="DataDisplay-icon-small"/>
                  </button>
                  <button type="button" className="invisible-button" onClick={() => handleSort('number', 'descending', 'latest_assessment', 'flag')}>
                    <img src={ArrowDown} alt="sort descending" className="DataDisplay-icon-small"/>
                  </button>
                </div>
              </div>
            </th>
            <th>
              <div className="flex-center">
                <p>Date</p>
                <div className="flex-column">
                  <button type="button" className="invisible-button" onClick={() => handleSort('date', 'ascending', 'latest_assessment', 'date')}>
                    <img src={ArrowUp} alt="sort ascending" className="DataDisplay-icon-small"/>
                  </button>
                  <button type="button" className="invisible-button" onClick={() => handleSort('date', 'descending', 'latest_assessment', 'date')}>
                    <img src={ArrowDown} alt="sort descending" className="DataDisplay-icon-small"/>
                  </button>
                </div>
              </div>
            </th>
            <th>
              <div className="flex-center">
                <p>
                  Goal
                </p>
                <div className="flex-column">
                  <button type="button" className="invisible-button" onClick={() => handleSort('number', 'ascending', 'latest_assessment', 'level')}>
                    <img src={ArrowUp} alt="sort descending" className="DataDisplay-icon-small"/>
                  </button>
                  <button type="button" className="invisible-button" onClick={() => handleSort('number', 'descending', 'latest_assessment', 'level')}>
                    <img src={ArrowDown} alt="sort descending" className="DataDisplay-icon-small"/>
                  </button>
                </div>
              </div>
            </th>
            <th>
              <div className="flex-center">
                <p>
                  Percent
                  <br />
                  Correct
                </p>
                <div className="flex-column">
                  <button type="button" className="invisible-button" onClick={() => handleSort('number', 'ascending', 'latest_assessment', 'percent_as_int')}>
                    <img src={ArrowUp} alt="sort descending" className="DataDisplay-icon-small"/>
                  </button>
                  <button type="button" className="invisible-button" onClick={() => handleSort('number', 'descending', 'latest_assessment', 'percent_as_int')}>
                    <img src={ArrowDown} alt="sort descending" className="DataDisplay-icon-small"/>
                  </button>
                </div>
              </div>
            </th>
            <th>
              <div className="flex-center">
                <p>
                  Percent
                  <br />
                  Fluent
                </p>
                <div className="flex-column">
                  <button type="button" className="invisible-button" onClick={() => handleSort('number', 'ascending', 'latest_assessment', 'avg_time')}>
                    <img src={ArrowUp} alt="sort descending" className="DataDisplay-icon-small"/>
                  </button>
                  <button type="button" className="invisible-button" onClick={() => handleSort('number', 'descending', 'latest_assessment', 'avg_time')}>
                    <img src={ArrowDown} alt="sort descending" className="DataDisplay-icon-small"/>
                  </button>
                </div>
              </div>
            </th>
          </tr>
          {studentRows}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="8">
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
