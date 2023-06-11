import { useNavigate, Link } from "react-router-dom";
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
      <Link to="/">MathFacts Home</Link>
      {currentUser != null ? (
        <button onClick={handleLogOut}>Log Out</button>
      ) : (
        <Link to="/">Log In</Link>
      )}
    </div>
  );
}
