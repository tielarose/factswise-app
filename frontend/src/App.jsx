import "./App.css";
import Navbar from "./Navbar";
import WelcomeScreen from "./WelcomeScreen";
import EducatorLogin from "./EducatorLogin";
import StudentLogin from "./StudentLogin";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// { isLoggedOut && <LoggedOutNavbar />}
// { isStudent && <StudentNavbar />}
// or
// <Navbar /> --> determines which to render

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* for each route, do what is on the line below */}
        <Route exact path="/" element={<WelcomeScreen />}></Route>
        <Route exact path="/educator/login" element={<EducatorLogin />}></Route>
        <Route exact path="/student/login" element={<StudentLogin />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
