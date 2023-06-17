import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EducatorDashboardDataDisplay.css";

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

  const studentRows = allStudents.map((student) => (
    <tr key={student.student_id}>
      <td>
        {" "}
        <button onClick={handleStudentNameClick} value={student.student_id}>
          {student.student_first_name} {student.student_last_name}
        </button>
      </td>
      <td>{student.current_problem_set}</td>
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
          </tr>
          {studentRows}
        </tbody>
      </table>
    </div>
  );
}
