import { useEffect, useState, useContext } from "react";
import { AppContext } from "./App";
import "./EducatorDashboard.css";
import "./EducatorDashboardDataDisplay";
import EducatorDashboardDataDisplay from "./EducatorDashboardDataDisplay";

export default function EducatorDashboard() {
  const allContext = useContext(AppContext);
  const currentUser = allContext.currentUser;
  const [classrooms, setClassrooms] = useState([]);
  const [currentClassroom, setCurrentClassroom] = useState(null);

  useEffect(() => {
    const educator_id = localStorage.getItem("userId");

    fetch(`/api/educator/${educator_id}/classrooms`)
      .then((response) => response.json())
      .then((data) => {
        setClassrooms(data.classrooms);
        if (currentClassroom === null) {
          setCurrentClassroom(data.classrooms[0]);
        }
      });
  }, []);

  function handleClassroomClick(classroom) {
    setCurrentClassroom(classroom);
  }

  const classroomLinks = classrooms.map((classroom) => (
    <button
      onClick={() => handleClassroomClick(classroom)}
      key={classroom.classroom_id}
    >
      {classroom.classroom_name}
    </button>
  ));

  return (
    <div className="EducatorDashboard">
      <h2>
        Welcome, {currentUser?.educator_first_name}{" "}
        {currentUser?.educator_last_name}
      </h2>{" "}
      <p>
        Current Classroom:{" "}
        {currentClassroom ? currentClassroom.classroom_name : ""}
      </p>
      <p>Switch Classrooms: {classroomLinks}</p>{" "}
      {/* <EducatorDashboardDataDisplay
  //       classroom_id={currentClassroom?.classroom_id}
  //     /> */}{" "}
      <p>
        <a href="">Create a new student</a>{" "}
      </p>{" "}
      <p>
        <a href="">Create a new class</a>{" "}
      </p>
    </div>
  );
}
