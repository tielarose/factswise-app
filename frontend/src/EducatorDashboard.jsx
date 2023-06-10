import { useEffect, useState, useContext } from "react";
import App, { AppContext } from "./App";
import "./EducatorDashboard.css";
import "./EducatorDashboardDataDisplay";
import EducatorDashboardDataDisplay from "./EducatorDashboardDataDisplay";

export default function EducatorDashboard() {
  const allContext = useContext(AppContext);
  const currentUser = allContext.currentUser;
  const [currentClassroom, setCurrentClassroom] = useState(null);
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    const educator_id = localStorage.getItem("userId");

    fetch(`/api/educator/${educator_id}/classrooms`)
      .then((response) => response.json())
      .then((data) => {
        setClassrooms(data.classrooms);
        setCurrentClassroom(data.classrooms[0]);
      });
  }, []);

  // function handleClassroomClick(classroom_code) {
  //   setCurrentClassroom(classroom_code);
  // }

  // const classroomLinks = classrooms.map((classroom) => (
  //   <a href="" onClick={handleClassroomClick(classroom.classroom_code)}>
  //     {classroom.classroom_name}
  //   </a>
  // ));

  return (
    <div className="EducatorDashboard">
      <h2>
        Welcome, {currentUser?.educator_first_name}{" "}
        {currentUser?.educator_last_name}
      </h2>
      <p>
        Current Classroom:{" "}
        {currentClassroom ? currentClassroom.classroom_name : ""}
      </p>
      {/* <p>Switch Classrooms: {classroomLinks}</p> */}
      <EducatorDashboardDataDisplay
        classroom_id={currentClassroom?.classroom_id}
      />
      <p>
        <a href="">Create a new student</a>
      </p>
      <p>
        <a href="">Create a new class</a>
      </p>
    </div>
  );
}
