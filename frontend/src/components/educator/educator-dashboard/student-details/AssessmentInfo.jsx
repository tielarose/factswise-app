import { useState, useEffect } from "react";
import { format } from "date-fns";

export default function AssessmentInfo({ student_id }) {
  const [assessments, setAssessments] = useState([]);

  // get information on the current student from the server
  useEffect(() => {
    fetch(`/api/educator/studentinfo/${student_id}`)
      .then((response) => response.json())
      .then((data) => {
        setAssessments(data.assessments);
      });
  }, []);

  function convertDate(date_str) {
    const months_dict = {
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
      Dec: 11
    };

    const day = parseInt(date_str.slice(5, 7));
    const month = months_dict[date_str.slice(8, 11)];
    const year = parseInt(date_str.slice(12, 17));

    return new Date(year, month, day);
  }

  let assessmentRows = [];

  if (assessments.length > 0) {
    assessmentRows = assessments.map((assessment) => (
      <tr>
        <td>
          {assessment.date
            ? format(convertDate(assessment.date), "M/dd/yy")
            : "n/a"}
        </td>
        <td>goal</td>
        <td>
          {assessment.num_correct
            ? `${assessment.num_correct} / ${assessment.total}`
            : "n/a"}
        </td>
        <td>
          {assessment.percent_as_int ? `${assessment.percent_as_int}%` : "n/a"}
        </td>
      </tr>
    ));
  }

  return (
    <table>
      <tr>
        <th>Date Assessed</th>
        <th>Goal #</th>
        <th>Score</th>
        <th>Percent</th>
      </tr>
      <tbody>{assessmentRows}</tbody>
    </table>
  );
}
