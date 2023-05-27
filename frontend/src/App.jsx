import "./App.css";
import LoggedOutNavbar from "./LoggedOutNavbar";
import WelcomeScreen from "../WelcomeScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// { isLoggedOut && <LoggedOutNavbar />}
// { isStudent && <StudentNavbar />}
// or
// <Navbar /> --> determines which to render

function App() {
  return (
    <BrowserRouter>
      <LoggedOutNavbar />
      <Routes>
        {/* for each route, do what is on the line below */}
        <Route exact path="/" element={<WelcomeScreen />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
