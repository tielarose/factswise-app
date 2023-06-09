import { useEffect, useState } from "react";
import { AppContext } from "./App";
import "./EducatorDashboard.css";

export default function EducatorDashboard() {
  const currentUser = AppContext.currentUser;
  const [currentClassroom, setCurrentClassroom] = useState(null);
  const [students, setStudents] = useState([]);
  const [educUser, setEducUser] = useState({});
  const [allClassrooms, setAllClassrooms] = useState([]);
  // const [allStudents, setAllStudents] = useState([]);

  // let studentsArray = [];
  // let classroomsArray = [];

  useEffect(() => {
    const user_id = localStorage.getItem("userId");

    fetch(`/api/educator/${user_id}/info`)
      .then((response) => response.json())
      .then((data) => {
        setEducUser(data.educator);
        setCurrentClassroom(data.classrooms[0]);
        setStudents(data.students);
        setAllClassrooms(data.classrooms);
      });
  }, []);

  console.log(
    "EducatorDashboard component, line 5; currentUser is: ",
    currentUser
  );

  return (
    <div className="EducatorDashboard">
      <h2>
        Welcome, {educUser.educator_first_name} {educUser.educator_last_name}
      </h2>
      <p>Current Classroom: {currentClassroom}</p>
      <p>
        Switch Classrooms:{" "}
        {allClassrooms.map((classroom) => (
          <a href="">{classroom}</a>
        ))}
      </p>
      <table>
        <tr>
          <th>Student Name</th>
          <th>Current Goal</th>
        </tr>
        {students.map((student) => (
          <tr>
            <td>
              {student.student_first_name} {student.student_last_name}
            </td>
            <td>{student.current_problem_set}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
