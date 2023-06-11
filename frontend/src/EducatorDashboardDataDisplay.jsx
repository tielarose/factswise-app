import { useEffect, useState } from "react";
import "./EducatorDashboardDataDisplay.css";

export default function EducatorDashboardDataDisplay(props) {
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

  const studentRows = allStudents.map((student) => (
    <tr key={student.student_id}>
      <td>
        {student.student_first_name} {student.student_last_name}
      </td>
      <td>{student.current_problem_set}</td>
    </tr>
  ));

  return (
    <div className="DataDisplay">
      <table>
        <tbody>
          <tr>
            <th>Student</th>
            <th>Current Goal</th>
          </tr>
          {studentRows}
        </tbody>
      </table>
    </div>
  );
}
