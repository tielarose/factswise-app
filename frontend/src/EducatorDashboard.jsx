import { useEffect, useState, useContext } from "react";
import App, { AppContext } from "./App";
import "./EducatorDashboard.css";

export default function EducatorDashboard() {
  const allContext = useContext(AppContext);
  const currentUser = allContext.currentUser;
  const [currentClassroom, setCurrentClassroom] = useState(null);
  const [educator, setEducator] = useState({});
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    const user_id = localStorage.getItem("userId");

    fetch(`/api/educator/${user_id}/info`)
      .then((response) => response.json())
      .then((data) => {
        setEducator(data.educator);
        setClassrooms(data.classrooms);
        setCurrentClassroom(data.classrooms[0]);
      });
  }, []);

  // console.log("line 27, educator is", educator);
  // console.log("line 28, classrooms is", classrooms);
  // console.log("line 29, currentClassroom is", currentClassroom);
  // function handleClassroomClick(classroom_code) {
  //   setCurrentClassroom(classroom_code);
  // }

  // const classroomLinks = classrooms.map((classroom) => (
  //   <a href="" onClick={handleClassroomClick(classroom.classroom_code)}>
  //     {classroom.classroom_name}
  //   </a>
  // ));

  // need to get useContext to work for this, could replace setEducator if it works
  console.log(
    "EducatorDashboard component, line 5; currentUser is: ",
    currentUser
  );

  return (
    <div className="EducatorDashboard">
      <h2>
        Welcome, {educator.educator_first_name} {educator.educator_last_name}
      </h2>
      <p>
        Current Classroom:{" "}
        {currentClassroom ? currentClassroom.classroom_name : ""}
      </p>
      {/* <p>Switch Classrooms: {classroomLinks}</p> */}

      <p>
        <a href="">Create a new student</a>
      </p>
      <p>
        <a href="">Create a new class</a>
      </p>
    </div>
  );
}
