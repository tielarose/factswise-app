import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "./App";
import "./EducatorDashboard.css";
import "./EducatorDashboardDataDisplay";
import EducatorDashboardDataDisplay from "./EducatorDashboardDataDisplay";

export default function EducatorDashboard() {
  const navigate = useNavigate();
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

  function handleNewStudentClick() {
    navigate("/educator/new/student", {
      state: { classroom: currentClassroom }
    });
  }

  function handleNewClassroomClick() {
    navigate("/educator/new/classroom");
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
      {currentClassroom ? (
        <EducatorDashboardDataDisplay
          classroom_id={currentClassroom.classroom_id}
        />
      ) : (
        ""
      )}{" "}
      <p>
        <button onClick={handleNewStudentClick}>Create a new student</button>{" "}
      </p>{" "}
      <p>
        <button onClick={handleNewClassroomClick}>Create a new class</button>{" "}
      </p>
    </div>
  );
}
