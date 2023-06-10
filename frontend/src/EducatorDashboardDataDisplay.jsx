import { useEffect, useState } from "react";
import "./EducatorDashboardDataDisplay.css";

export default function EducatorDashboardDataDisplay(props) {
  const classroom_id = props.classroom_id;
  const [allStudents, setAllStudents] = useState([]);

  useEffect(() => {
    fetch(`/api/educator/classroom_info/${classroom_id}`)
      .then((response) => response.json())
      .then((data) => {
        setAllStudents(data.students);
      });
  }, []);

  const studentRows = allStudents.map((student) => (
    <tr>
      <td>
        {student.student_first_name} {student.student_last_name}
      </td>
      <td>{student.current_problem_set}</td>
    </tr>
  ));

  return (
    <div className="DataDisplay">
      <table>
        <tr>
          <th>Student</th>
          <th>Current Goal</th>
        </tr>
        {studentRows}
      </table>
    </div>
  );
}
