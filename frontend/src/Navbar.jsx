import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { AppContext } from "./App";

export default function Navbar(props) {
  const navigate = useNavigate();
  // why isn't currentUser updating? The App component has info but it's still null here. Same as in EducatorLogin
  const currentUser = AppContext.currentUser;
  console.log("Navbar, line 9, currentUser is:", currentUser);

  function handleLogOut() {
    localStorage.clear();
    props.setCurrentUser({});
    setNavIsStudent(false);
    setNavIsEducator(false);
    setNavCurrentUser({});
    navigate("/");
  }

  return (
    // { isLoggedOut && <NavbarLoggedOut />}
    // { isStudent && <NavbarStudent /> }
    // { isEducator && <NavbarEducator/> }
    <div className="Navbar">
      <a href="/">MathFacts Home</a>
      {currentUser ? (
        <a href="" onClick={handleLogOut}>
          Log Out
        </a>
      ) : (
        <a href="/">Log In</a>
      )}
    </div>
  );
}
