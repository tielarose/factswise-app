import "./App.css";
import Navbar from "../Navbar";
import Homepage from "../Homepage";
import EducatorLogin from "./educator/educator-login/EducatorLogin";
import EducatorSignup from "./educator/educator-signup/EducatorSignup";
import EducatorDashboard from "../EducatorDashboard";
import StudentLogin from "./student/student-login/StudentLogin";
import NewStudent from "../NewStudent";
import NewClassroom from "../NewClassroom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, createContext, useEffect } from "react";

export const AppContext = createContext(null);

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isEducator, setIsEducator] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    const user_id = localStorage.getItem("userId");

    if (user_id != null) {
      fetch("/api/checkuser", {
        method: "POST",
        body: JSON.stringify({
          user_id: user_id
        }),
        headers: { "Content-Type": "application/json" }
      })
        .then((response) => response.json())
        .then((data) => {
          setIsStudent(data.is_student);
          setIsEducator(data.is_educator);
          setCurrentUser(data.user_info);
        });
    }
  }, []);

  return (
    <BrowserRouter>
      <AppContext.Provider
        value={{
          currentUser,
          isEducator,
          isStudent
        }}
      >
        <Navbar
          setCurrentUser={setCurrentUser}
          setIsEducator={setIsEducator}
          setIsStudent={setIsStudent}
        />
        <Routes>
          {/* for each route, do what is on the line below */}
          <Route exact path="/" element={<Homepage />}></Route>
          <Route
            exact
            path="/educator/login"
            element={
              <EducatorLogin
                setCurrentUser={setCurrentUser}
                setIsEducator={setIsEducator}
              />
            }
          ></Route>
          <Route
            exact
            path="/educator/signup"
            element={
              <EducatorSignup
                setCurrentUser={setCurrentUser}
                setIsEducator={setIsEducator}
              />
            }
          ></Route>
          <Route
            exact
            path="/educator/home"
            element={<EducatorDashboard currentUser={currentUser} />}
          ></Route>
          <Route
            exact
            path="/educator/new/student"
            element={<NewStudent />}
          ></Route>
          <Route
            exact
            path="/educator/new/classroom"
            element={<NewClassroom />}
          ></Route>
          <Route exact path="/student/login" element={<StudentLogin />}></Route>
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
