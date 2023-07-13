/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

export default function AssessmentInfo({ studentId }) {
  const [assessments, setAssessments] = useState([]);

  // get information on the current student from the server
  useEffect(() => {
    fetch(`/api/educator/studentinfo/${studentId}`)
      .then((response) => response.json())
      .then((data) => {
        setAssessments(data.assessments);
      });
  }, []);

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

  const problemSetTypeToSymbol = {
    'Addition Subtraction': '+ -',
    'Multiplication Division': 'x &divide;',
  };

  let assessmentRows = [];

  if (assessments.length > 0) {
    assessmentRows = assessments.map((assessment) => (
      <tr key={assessment.date}>
        <td>
          {assessment.date
            ? format(convertDate(assessment.date), 'M/dd/yy')
            : ''}
        </td>
        <td>
          { problemSetTypeToSymbol[assessment.problem_set_type]}
          {' '}
          { assessment.level}
        </td>
        <td>
          {assessment.num_correct
            ? `${assessment.num_correct} / ${assessment.total}`
            : ''}
        </td>
        <td>
          {assessment.percent_correct_as_int ? `${assessment.percent_correct_as_int}%` : ''}
        </td>
        <td>
          {assessment.percent_fluent_as_int ? `${assessment.percent_fluent_as_int}%` : ''}
        </td>
      </tr>
    ));
  }

  return (
    <div className="assessment-info-container">
      <table className="StudentDetails-AssessmentInfo">
        <thead>
          <tr>
            <th>
              Date
              <br />
              Assessed
            </th>
            <th>Goal #</th>
            <th>Score</th>
            <th>
              Percent
              <br />
              Correct
            </th>
            <th>
              Percent
              <br />
              Fluent
            </th>
          </tr>
        </thead>
        <tbody>{assessmentRows}</tbody>
      </table>
    </div>
  );
}
