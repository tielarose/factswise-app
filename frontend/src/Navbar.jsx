import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { AppContext } from "./App";
import { useContext } from "react";

export default function Navbar(props) {
  const navigate = useNavigate();
  const allContext = useContext(AppContext);
  const currentUser = allContext.currentUser;
  const isEducator = allContext.isEducator;
  const isStudent = allContext.isStudent;

  // console.log("Navbar allContext is", allContext);

  function handleLogOut() {
    console.log("LOG OUT RAN!");
    localStorage.clear();
    props.setCurrentUser(null);
    props.setIsEducator(false);
    props.setIsStudent(false);
    navigate("/");
  }
  return (
    // { isLoggedOut && <NavbarLoggedOut />}
    // { isStudent && <NavbarStudent /> }
    // { isEducator && <NavbarEducator/> }
    <div className="Navbar">
      <a href="/">MathFacts Home</a>
      {currentUser != null ? (
        <a href="" onClick={handleLogOut}>
          Log Out
        </a>
      ) : (
        <a href="/">Log In</a>
      )}
    </div>
  );
}
