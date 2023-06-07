import "./App.css";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import EducatorLogin from "./EducatorLogin";
import EducatorSignup from "./EducatorSignup";
import EducatorDashboard from "./EducatorDashboard";
import StudentLogin from "./StudentLogin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, createContext } from "react";

// { isLoggedOut && <LoggedOutNavbar />}
// { isStudent && <StudentNavbar />}
// or
// <Navbar /> --> determines which to render

// const CurrentUserContext = createContext(null);

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <BrowserRouter>
      {/* <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}> */}
      <Navbar />
      <Routes>
        {/* for each route, do what is on the line below */}
        <Route exact path="/" element={<Homepage />}></Route>
        <Route
          exact
          path="/educator/login"
          element={
            <EducatorLogin
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        ></Route>
        <Route
          exact
          path="/educator/signup"
          element={<EducatorSignup />}
        ></Route>
        <Route
          exact
          path="/educator/home"
          element={<EducatorDashboard currentUser={currentUser} />}
        ></Route>
        <Route exact path="/student/login" element={<StudentLogin />}></Route>
      </Routes>
      {/* </CurrentUserContext.Provider> */}
    </BrowserRouter>
  );
}

export default App;
