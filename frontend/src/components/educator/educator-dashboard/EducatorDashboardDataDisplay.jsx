import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EducatorDashboardDataDisplay.css";
import { format } from "date-fns";

export default function EducatorDashboardDataDisplay(props) {
  const navigate = useNavigate();
  const classroom_id = props.classroom_id;
  const [allStudents, setAllStudents] = useState([]);

  useEffect(() => {
    if (classroom_id) {
      fetch(`/api/educator/classroom_info/${classroom_id}`)
        .then((response) => response.json())
        .then((data) => {
          setAllStudents(data.students);
        });
    }
  }, [classroom_id]);

  function handleStudentNameClick(evt) {
    const student_id = evt.target.value;
    navigate("/educator/studentdetails", { state: { student_id: student_id } });
  }

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

  const studentRows = allStudents.map((student) => (
    <tr key={student.student_id}>
      <td>
        {" "}
        <button onClick={handleStudentNameClick} value={student.student_id}>
          {student.student_first_name} {student.student_last_name}
        </button>
      </td>
      <td>{student.current_problem_set}</td>
      <td>
        {student.latest_assessment.date
          ? format(convertDate(student.latest_assessment.date), "M/dd/yy")
          : "n/a"}
      </td>
      <td>
        {student.latest_assessment.num_correct
          ? `${student.latest_assessment.num_correct} / ${student.latest_assessment.total}`
          : "n/a"}
      </td>
      <td>
        {student.latest_assessment.percent_as_int
          ? `${student.latest_assessment.percent_as_int}%`
          : "n/a"}
      </td>
    </tr>
  ));

  return (
    <div className="DataDisplay">
      <p>Click on a student's name to view more details</p>
      <table>
        <tbody>
          <tr>
            <th>Student</th>
            <th>Current Goal</th>
            <th>Last Assessed</th>
            <th>Score</th>
            <th>Percent</th>
          </tr>
          {studentRows}
        </tbody>
      </table>
    </div>
  );
}
